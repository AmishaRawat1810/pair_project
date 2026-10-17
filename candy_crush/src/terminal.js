const enableMouse = "\x1b[?1000h\x1b[?1006h";
const disableMouse = "\x1b[?1006l\x1b[?1000l";
const showCursor = "\x1b[?25h";
const hideCursor = "\x1b[?25l";
const resetStyles = "\x1b[0m";

const encode = (text) => new TextEncoder().encode(text);

const readMouseEvent = (pending) => {
  const end = pending.search(/[Mm]/);
  if (end === -1) {
    return { incomplete: true, shouldQuit: pending.includes("q") };
  }

  const sequence = pending.slice(0, end + 1);
  const match = sequence.match(/^\x1b\[<(\d+);(\d+);(\d+)([Mm])$/);
  const [, button, x, y, action] = match ?? [];

  return {
    incomplete: false,
    length: sequence.length,
    click: action === "M" && Number(button) % 4 === 0
      ? { x: Number(x), y: Number(y) }
      : null,
  };
};

const readControlSequenceLength = (pending) => {
  const end = pending.slice(2).search(/[\x40-\x7e]/);
  return end === -1 ? null : end + 3;
};

const handleInput = async (input, state, onClick) => {
  state.pending += input;

  while (state.pending.length > 0) {
    if (state.pending.startsWith("\x1b[<")) {
      const event = readMouseEvent(state.pending);
      if (event.incomplete) return event.shouldQuit;
      state.pending = state.pending.slice(event.length);
      if (event.click) await onClick(event.click);
      continue;
    }

    if (state.pending.startsWith("\x1b[")) {
      if (state.pending.includes("q")) return true;
      const length = readControlSequenceLength(state.pending);
      if (length === null) return false;
      state.pending = state.pending.slice(length);
      continue;
    }

    if (state.pending[0] === "\x1b") {
      if (state.pending.length === 1) return false;
      state.pending = state.pending.slice(1);
      continue;
    }

    const key = state.pending[0];
    state.pending = state.pending.slice(1);
    if (key === "q") return true;
  }

  return false;
};

export const startTerminal = async (
  { onStart, onClick, onStop = () => {} },
) => {
  if (!Deno.stdin.isTerminal()) {
    throw new Error("Candy Crush requires an interactive terminal.");
  }

  let rawInputEnabled = false;
  let writer;
  const reader = Deno.stdin.readable.getReader();

  try {
    Deno.stdin.setRaw(true, { cbreak: true });
    rawInputEnabled = true;
    writer = Deno.stdout.writable.getWriter();
    await writer.write(encode(`${enableMouse}${hideCursor}`));
    onStart();

    const decoder = new TextDecoder();
    const state = { pending: "" };

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (
        await handleInput(
          decoder.decode(value, { stream: true }),
          state,
          onClick,
        )
      ) {break;}
    }
  } finally {
    try {
      onStop();
    } finally {
      try {
        if (writer) {
          await writer.write(
            encode(`${disableMouse}${showCursor}${resetStyles}`),
          );
        }
      } finally {
        reader.releaseLock();
        if (rawInputEnabled) Deno.stdin.setRaw(false);
        writer?.releaseLock();
      }
    }
  }
};
