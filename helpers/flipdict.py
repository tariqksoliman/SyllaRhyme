# The CMU phonemic dictionary has lines of form:
#      [word] [phone 1] [phone 2] ... [phone n]
# Thus to sort the file by rhyme, we need it of form:
#      [phone n] ... [phone 2] [phone 1] [word]
import re;

dictfile = '../dictionaries/cmudict-0.7b.txt'

# read all the lines of our dict
file = open( dictfile )
lines = file.readlines()
file.close();

# flip the words of each line (ignoring comments ';;;')
for i, line in enumerate(lines):
    if line[:3] != ';;;':
        lines[i] = ' '.join( re.sub(r"\(.*\)","", line).split()[::-1] );

# sort them alphabetically
lines.sort()

# write all those lines to flipdict ignoring comments
file = open( '../dictionaries/flipdict.txt', 'w+' )

for line in lines:
    if line[:3] != ';;;':
        file.write( line + '\n' )

file.close()