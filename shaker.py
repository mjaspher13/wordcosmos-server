import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)
GPIO.setup(7, GPIO.OUT)

p = GPIO.PWM(7, 50)
p.start(7.5)
rattle = 0

try :
	while rattle < 2:
		p.ChangeDutyCycle(3.5)
		time.sleep(1)
		p.ChangeDutyCycle(7.5)
		time.sleep(1)
		p.ChangeDutyCycle(11.0)
		time.sleep(1)
		p.ChangeDutyCycle(7.5)
		time.sleep(1)
		rattle = rattle+1

	rattle = 0
	while rattle < 4:
		p.ChangeDutyCycle(4.5)
		time.sleep(1)
		p.ChangeDutyCycle(7.5)
		time.sleep(1)
		p.ChangeDutyCycle(10.0)
		time.sleep(1)
		p.ChangeDutyCycle(7.5)
		time.sleep(1)
		rattle = rattle+1

except KeyboardInterrupt:
	p.stop()
	GPIO.cleanup()


