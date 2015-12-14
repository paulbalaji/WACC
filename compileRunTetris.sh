./compile tetris.wacc tetris_util.wacch lib/array.wacch
arm-linux-gnueabi-gcc -o tetris_game -mcpu=arm1176jzf-s -mtune=arm1176jzf-s tetris.s
qemu-arm -L /usr/arm-linux-gnueabi/ tetris_game