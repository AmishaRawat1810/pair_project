const start = async () => {
  const setUp();
  await Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(candyCrush)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(Deno.stdout.writable);
};
