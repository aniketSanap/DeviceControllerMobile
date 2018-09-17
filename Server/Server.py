import asyncio
import websockets
import pyautogui
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-port', help='defines port')
parser.add_argument('-host', help='defines hostname')

print("starting")
pyautogui.FAILSAFE = False
pyautogui.PAUSE = 0

class Server:
	
	def __init__(self, host, port):
		self.width, self.height = pyautogui.size()
		self.x = 0.0
		self.y = 0.0
		self.movement_deltaX = 3;
		self.movement_deltaY = 3;
		self.host = host
		self.port = port

	async def server_logic(self,websocket, path):
		async for message in websocket:
			message = message.split(" ")
			dx = float(message[2])
			dy = float(message[3])
			Lclick = message[4]
			#print(message)
			#print("delta x: %f, delta y: %f" % (dx,dy))
			if Lclick == "true":
				pyautogui.click()
			if dx > -1 and dx <1:
				pass
			elif dx < 0:
				self.x = self.x + self.movement_deltaX
			elif dx > 0:
				self.x = self.x - self.movement_deltaX

			if dy > -1 and dy < 1:
				pass
			elif dy > 0:
				self.y = self.y + self.movement_deltaY
			elif dy < 0:
				self.y = self.y - self.movement_deltaY

			# Clip values

			if self.y > self.height:
				self.y = self.height
			elif self.y < 0:
				self.y = 0

			if self.x > self.width:
				self.x = self.width
			elif self.x < 0:
				self.x = 0

			print(self.x, self.y)
			pyautogui.moveTo(self.x,self.y,duration=0.01)
			#pyautogui.moveRel(dx, dy)

	def start(self):
		return websockets.serve(self.server_logic, self.host,self.port)

if __name__ == '__main__':
	args = parser.parse_args()
	server = Server(args.host, args.port)
	asyncio.get_event_loop().run_until_complete(server.start())
	asyncio.get_event_loop().run_forever()