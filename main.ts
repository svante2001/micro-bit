//count lines
 import kitronik = kitronik_motor_driver

let Right_Detector = 0
let Left_Detector = 0
let count = 0

pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)

 function runForMS(motor1: number, motor2: number, ms: number) {
    let running = true;
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
                motor1);
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

//0 is the black line
//1 is the white background
 
// testing of showNumber with sensor

basic.forever(function() {
    Right_Detector = pins.digitalReadPin(DigitalPin.P2) 
    if (Right_Detector == 1){
        basic.showNumber(count)
    } else if (Right_Detector == 0){
        runForMS(0, 0, 2000)
        count ++
        basic.showNumber(count)
    }
})

// Count lines while following main line

 basic.forever(function() {
    Left_Detector = pins.digitalReadPin(DigitalPin.P1) 
    Right_Detector = pins.digitalReadPin(DigitalPin.P2) 
    if (Right_Detector == 1 && Left_Detector == 1){
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 40)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, 10)
        basic.showNumber(count)
    } else if (Right_Detector == 1 && Left_Detector == 0){
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, 40)
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, 10)
        basic.showNumber(count)
    } else if (Right_Detector == 0 && Left_Detector == 1){
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 40)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, 10)
        count ++
        basic.showNumber(count)
    } else if (Right_Detector == 0 && Left_Detector == 0){
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, 40)
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, 10)
        count ++
        basic.showNumber(count)
    }
 })