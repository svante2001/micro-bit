// //count lines
import kitronik = kitronik_motor_driver

let Left = 0
let Mid = 0
let count = 0

pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)

// //set up for runForMS

function runForMS(motor1: number, motor2: number, ms: number) {
   let running = true
   control.inBackground(() => {
       if (motor1 === 0) {
           kitronik_motor_driver.motorOff(kitronik_motor_driver.Motors.Motor1)
       } else if (motor1 < 0) {
           kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1,
               kitronik_motor_driver.MotorDirection.Reverse,
               Math.abs(motor1))
       } else {
           kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1,
               kitronik_motor_driver.MotorDirection.Forward,
               motor1)
       }
       if (motor2 === 0) {
           kitronik_motor_driver.motorOff(kitronik_motor_driver.Motors.Motor2)
       } else if (motor2 < 0) {
           kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2,
               kitronik_motor_driver.MotorDirection.Reverse,
               Math.abs(motor2))
       } else {
           kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2,
               kitronik_motor_driver.MotorDirection.Forward,
               motor2)
       }
       while (running) {
           basic.pause(1)
       }
       kitronik_motor_driver.motorOff(kitronik_motor_driver.Motors.Motor1) 
       kitronik_motor_driver.motorOff(kitronik_motor_driver.Motors.Motor2)
   })
   basic.pause(ms)
   running = false
}

// //0 is the black line
// //1 is the white background
//left sensor = P1
//mid sensor = P2

// // Testing of showNumber with sensor to calibrate. Out comment line 64-89

basic.forever(function() {
   Left = pins.digitalReadPin(DigitalPin.P2) 
   if (Left == 1) {
       basic.showNumber(count)
   } else if (Left == 0) {
       count ++
       basic.showNumber(count)
       runForMS(0, 0, 2000)
   }
})

// // Count lines while following main line

control.inBackground(function () {
   basic.forever(function () {
       let Mid = pins.digitalReadPin(DigitalPin.P2)
       if (Mid == 1) {
           kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, 40)
           kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, 20)
       } else if (Mid == 0) {
           kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 40)
           kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, 20)
       }
       basic.pause(10)
   })
})

control.inBackground(function () {
   basic.forever(function () {
    let Venstre = pins.digitalReadPin(DigitalPin.P1)
       if (Venstre == 1) {
           basic.showNumber(count)
       } else {
           count++
           basic.showNumber(count)
       }
       basic.pause(10)
   })
})

//TODO:
control.inBackground(function () {
   basic.forever(function () {
       if (count == 1) {
        runForMS(35, -35, 1500)
        kitronik.motorOff(kitronik.Motors.Motor1)
        kitronik.motorOff(kitronik.Motors.Motor2)
       }
       basic.pause(10)
   })
})