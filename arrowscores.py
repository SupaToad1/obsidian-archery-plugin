import sys

filenam=sys.argv[2]
filenam='/home/user/Vault/'+filenam+'.md'
mode=sys.argv[1]
if mode=='total':
	endscores=[]
	totalscore=0
	with open(filenam, 'r') as f:
		#line=f.readline()
		file=f.readlines()
		#print(line)
		counter = 0
		for i in file:
			if i[0].lower() == 'x' or i[0].isdigit() or i[0].lower() == 'm':
				counter+=1
				break
			counter+=1
		
		# begin scoring
		line=file[counter]
		index = 0
		endscore=0
		while True:
			try:
				print(line)
				while line[index]:
					if line[index].lower() == 'x':
						endscore+=10
						index+=1
					elif line[index].lower() == 'm':
						continue
					elif line[index] == '1' and line[index+1] == '0':
						endscore+=10
						index+=2
					else:
						endscore+=int(line[index])
						index+=1
				counter+=1
				index=0
				line=file[counter]
				endscores.append(endscore)
				totalscore+=endscore
				endscore=0
			except:
				break
	# write scores to file
	with open(filenam, 'a') as f:
		f.write('\n');
		f.write('total score: ')
		f.write(str(totalscore))
		f.write('\n')
		f.write(str(endscores))

		
		'''
		
		for i in range(len(line)):
			endtotal'''
