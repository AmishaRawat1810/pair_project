const enableMouse = "\x1b[?1000h";
const disableMouse = "\x1b[?1000l";
const showCursor = "\x1b[?25h";
const hideCursor = "\x1b[?25l";
const clear = "\x1b[2J";

const setUp = () => {
  Deno.stdin.setRaw(true, { cbreak: true });
  const writer = Deno.stdout.writable.getWriter();
  writer.write(new TextEncoder().encode(clear));
  writer.write(new TextEncoder().encode(enableMouse));
  writer.write(new TextEncoder().encode(hideCursor));
  /*
    - \x1b[M<b><row>;<col> M -> mouse click
    - \x1b[?1000h enable
    - \x1b[?1000l disable
    - \x1b[2J -> clear
    - \x1b[?25l -> hide cursor
    - \x1b[?25h -> show cursor
  */
};

const candyCrush = new TransformStream({
  transform(chunk, controller) {
    if (chunk === "q") {
      controller.enqueue(disableMouse + showCursor);
    }
    const regex = '/[(\d+)(\d+);(\d+) M/g'
    const matches = chunk.matchAll(regex);
    matches.forEach(match => {
      
    });
    if (chunk)
  },
});

const start = async () => {
  await setUp();
  await Deno.stdin.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(candyCrush)
    .pipeThrough(new TextEncoderStream())
    .pipeTo(Deno.stdout.writable);
};
