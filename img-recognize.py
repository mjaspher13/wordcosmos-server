import os
l=os.listdir(os.getcwd()+'/img_slice') # Assuming data has is the parent directory of images
def dotremove(poi):  
    for x in poi:
        if x.startswith('.'):
            poi.remove(x)
dotremove(l) #To remove hidden files
for x in l:
    txt=str(x)+'.sh'
    file=open(txt,"w")
    p=os.listdir(os.getcwd()+'/img_slice/'+x)
    dotremove(p)
    for j in p:
        print('python3 label_image.py --image=/img_slice/'+x+'/'+j+' --label="/home/pi/boggle-model/labels/labels.txt" --graph="/home/pi/boggle-model/graphs/graph.pb"  --input_layer="input" --output_layer="final_result"',file=open(txt,"a"))