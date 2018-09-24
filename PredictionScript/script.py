from keras.models import load_model
import  pyHook, pythoncom
import pyautogui
import numpy as np

model = load_model('trained_model.h5py')
width, height =  pyautogui.size()
resolution_array = np.array([width, height])

X = []
counter = 1

mouse_flag = False

def mouse(event):
	global mouse_flag
	if mouse_flag == True:
		mouse_flag = False
		return False
# 	global X
# 	global counter
# 	X.append(event.Position)
# 	if counter < 258:
# 		counter += 1
# 		return False

# 	X_inp = np.array(X)
# 	X_inp = X_inp.reshape((1,258,2))
# #	print(X)
# 	#print(event.Position)
# 	X.clear()
# 	x,y = model.predict(X_inp)
# 	counter = 1
	
	if mouse_flag == False:
		X = np.array(event.Position) / resolution_array
		print(X)
		X = X.reshape(1,1,2)
		prediction = model.predict(X)
		pyautogui.moveTo(prediction[0,0,0]*width,prediction[0,0,1]*height,duration=0.01)
		mouse_flag = True
	return False


hm = pyHook.HookManager()
hm.MouseMove = mouse
hm.HookMouse()
pythoncom.PumpMessages()