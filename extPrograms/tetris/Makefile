# The toolchain to use. arm-none-eabi works, but there does exist 
# arm-bcm2708-linux-gnueabi.
ARMGNU ?= @arm-none-eabi

# The intermediate directory for compiled object files.
BUILD = build/

# The directory in which source files are stored.
SOURCE = source/

# The name of the output file to generate.
TARGET = kernel.img

# The name of the assembler listing file to generate.
LIST = kernel.list

# The name of the map file to generate.
MAP = kernel.map

# The name of the linker script to use.
LINKER = kernel.ld

# The names of all object files that must be generated. Deduced from the 
# assembly code files in source.
OBJECTS := $(patsubst $(SOURCE)%.s,$(BUILD)%.o,$(wildcard $(SOURCE)*.s))

default: kernel

# Rule to make everything.
all: $(TARGET) $(LIST)

# Rule to remake everything. Does not include clean.
rebuild: all

tetris:
	@../../compile tetris.wacc lib/array.wacch lib/gx.wacch lib/block.wacch lib/tetrisUtil.wacch -barebones

kernel:
	@echo "*** COMPILING TETRIS ***"
	@make tetris
	@rm -rf $(BUILD)
	@rm -f $(TARGET)
	@rm -f $(LIST)
	@rm -f $(MAP)
	@rm -rf $(SOURCE)
	@mkdir $(SOURCE)
	@cp tetris.s $(SOURCE)
	@echo "\n*** GENERATING KERNEL.IMG ***"
	@make all
	@echo "\n*** CHECK ASSEMBLER MESSAGES BEFORE COPYING KERNEL.IMG ***"
	@echo "*** THANK YOU FOR ASSEMBLING TETRIS, MERRY CHRISTMAS! ***"

# Rule to make the listing file.
$(LIST) : $(BUILD)output.elf
	$(ARMGNU)-objdump -d $(BUILD)output.elf > $(LIST)

# Rule to make the image file.
$(TARGET) : $(BUILD)output.elf
	$(ARMGNU)-objcopy $(BUILD)output.elf -O binary $(TARGET) 

# Rule to make the elf file.
$(BUILD)output.elf : $(OBJECTS) $(LINKER)
	$(ARMGNU)-ld --no-undefined $(OBJECTS) -Map $(MAP) -o $(BUILD)output.elf -T $(LINKER)

# Rule to make the object files.
$(BUILD)%.o: $(SOURCE)%.s $(BUILD)
	$(ARMGNU)-as -I $(SOURCE) $< -o $@

$(BUILD):
	@mkdir $@
	@echo "\n*** ASSEMBLER MESSAGES ***"

# Rule to clean files.
clean : 
	-rm -rf $(BUILD)
	-rm -f $(TARGET)
	-rm -f $(LIST)
	-rm -f $(MAP)