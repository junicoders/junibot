function motor_i2cWrite (reg: number, value: number) {
    let buf = pins.createBuffer(2)
buf[0] = reg
    buf[1] = value
    pins.i2cWriteBuffer(address, buf)
}
let address = 48
enum Motorlist {
    //% block="A"
    M1 = 1,
    //% block="B"
    M2 = 2
}
enum Direction1 {
    //% block="Para a frente"
    Forward = 0,
    //% block="Para trás"
    Backward = 1
}
enum LED_rgb_L_R {
    //% block="LED do lado direito"
    LED_R = 1,
    //% block="LED do lado esquerdo"
    LED_L = 0,
}
enum LED_color {
    //% block="Vermelho"
    red1 = 1,
    //% block="Verde"
    green1 = 2,
    //% block="Azul"
    blue1 = 3,
    //% block="Ciano"
    cyan = 4,
    //% block="Rosa"
    purple = 5,
    //% block="Branco"
    white = 6,
    //% block="Amarelo"
    yellow = 7,
    //% block="Desligar LED"
    black = 8,

}
enum pwm_led_l {
    //% block="Vermelho"
    pwm_red_r = 0x08,
    //% block="Verde"
    pwm_green_r = 0x07,
    //% block="Azul"
    pwm_blue_r = 0x06,
}
enum pwm_led_r {
    //% block="Vermelho"
    pem_red_l = 0x09,
    //% block="Verde"
    pwm_green_l = 0x0a,
    //% block="Azul"
    pwm_blue_l = 0x05,
}
//% weight=100 color=#0364db icon="\uf1b9"
namespace JuniBot {

    //% weight=100 color=#ff0000 icon="\uf1b9"
    //% block="Motor = %motor Direção = | $direction Velocidade = $pwmvalue"
    //% pwmvalue.min=0 pwmvalue.max=255 
    //% group="Motor" weight=65
    export function motor(motor: Motorlist, direction: Direction1, pwmvalue: number) {
        switch (motor) {
            case 1:
                if (direction) {
                    motor_i2cWrite(0x01, pwmvalue); motor_i2cWrite(0x02, 0);
                }
                else {
                    motor_i2cWrite(0x02, pwmvalue); motor_i2cWrite(0x01, 0);
                }
                break;
            case 2:
                if (direction) {
                    motor_i2cWrite(0x04, pwmvalue); motor_i2cWrite(0x03, 0);
                }
                else {
                    motor_i2cWrite(0x03, pwmvalue); motor_i2cWrite(0x04, 0);
                }
                break;
        }
    }


    //% block="Mostrar LED"
    //% group="RGB LED" weight=65
    export function led_show() {
        let a, s, d;

        motor_i2cWrite(0x07, 255); motor_i2cWrite(0x06, 255);
        motor_i2cWrite(0x0a, 255); motor_i2cWrite(0x05, 255);

        for (a = 255; a > 1; a--) {
            motor_i2cWrite(0x08, a);
            motor_i2cWrite(0x09, a);
            basic.pause(5);
        }

        for (s = 255; s > 1; s--) {
            motor_i2cWrite(0x07, s);
            motor_i2cWrite(0x0a, s);
            basic.pause(5);
        }

        for (a = 0; a < 255; a++) {
            motor_i2cWrite(0x08, a);
            motor_i2cWrite(0x09, a);
            basic.pause(5);
        }
        //blue
        for (d = 255; d > 1; d--) {
            motor_i2cWrite(0x06, d);
            motor_i2cWrite(0x05, d);
            basic.pause(5);
        }
        //green
        for (s = 0; s < 255; s++) {
            motor_i2cWrite(0x07, s);
            motor_i2cWrite(0x0a, s);
            basic.pause(5);
        }
        //rad
        for (a = 255; a > 1; a--) {
            motor_i2cWrite(0x08, a);
            motor_i2cWrite(0x09, a);
            basic.pause(5);
        }
        for (d = 0; d < 255; d++) {
            motor_i2cWrite(0x06, d);
            motor_i2cWrite(0x05, d);
            basic.pause(5);
        }
        for (a = 0; a < 255; a++) {
            motor_i2cWrite(0x08, a);
            motor_i2cWrite(0x09, a);
            basic.pause(5);
        }


    }

    //% block="LED do lado direito= |%color PWM= |$value"
    //% direction.shadow=timePicker
    //% value.min=0 value.max=255
    //% group="RGB LED" weight=66
    export function PWM_LED_R(color: pwm_led_r, value: number) {
        motor_i2cWrite(color, value);
    }
    //% block="LED do lado esquerdo= |%Cor PWM= |$value"
    //% direction.shadow=timePicker
    //% value.min=0 value.max=255
    //% group="RGB LED" weight=67
    export function PWM_LED_L(color: pwm_led_l, value: number) {
        motor_i2cWrite(color, value);
    }

    //% block="Desligar LED"
    //% group="RGB LED" weight=64
    export function LED_OFF() {
        motor_i2cWrite(0x08, 255); motor_i2cWrite(0x07, 255); motor_i2cWrite(0x06, 255);
        motor_i2cWrite(0x09, 255); motor_i2cWrite(0x0a, 255); motor_i2cWrite(0x05, 255);
    }


    //% block="RGB = |%Cor = |$color"
    //% direction.shadow=timePicker
    //% group="RGB LED" weight=68
    export function led_rgb(place: LED_rgb_L_R, color: LED_color) {
        if (place == 1) {
            switch (color) {
                case 1: { motor_i2cWrite(0x08, 0); motor_i2cWrite(0x07, 255); motor_i2cWrite(0x06, 255); };
                    break;
                case 2: { motor_i2cWrite(0x08, 255); motor_i2cWrite(0x07, 0); motor_i2cWrite(0x06, 255); };
                    break;
                case 3: { motor_i2cWrite(0x08, 255); motor_i2cWrite(0x07, 255); motor_i2cWrite(0x06, 0); };
                    break;
                case 4: { motor_i2cWrite(0x08, 255); motor_i2cWrite(0x07, 0); motor_i2cWrite(0x06, 0); };
                    break;
                case 5: { motor_i2cWrite(0x08, 0); motor_i2cWrite(0x07, 255); motor_i2cWrite(0x06, 0); };
                    break;
                case 6: { motor_i2cWrite(0x08, 0); motor_i2cWrite(0x07, 0); motor_i2cWrite(0x06, 0); };
                    break;
                case 7: { motor_i2cWrite(0x08, 0); motor_i2cWrite(0x07, 0); motor_i2cWrite(0x06, 255); };
                    break;
                case 8: { motor_i2cWrite(0x08, 255); motor_i2cWrite(0x07, 255); motor_i2cWrite(0x06, 255); };
                    break;
            }
        }
        if (place == 0) {
            switch (color) {
                case 1: { motor_i2cWrite(0x09, 0); motor_i2cWrite(0x0a, 255); motor_i2cWrite(0x05, 255); };
                    break;
                case 2: { motor_i2cWrite(0x09, 255); motor_i2cWrite(0x0a, 0); motor_i2cWrite(0x05, 255); };
                    break;
                case 3: { motor_i2cWrite(0x09, 255); motor_i2cWrite(0x0a, 255); motor_i2cWrite(0x05, 0); };
                    break;
                case 4: { motor_i2cWrite(0x09, 255); motor_i2cWrite(0x0a, 0); motor_i2cWrite(0x05, 0); };
                    break;
                case 5: { motor_i2cWrite(0x09, 0); motor_i2cWrite(0x0a, 255); motor_i2cWrite(0x05, 0); };
                    break;
                case 6: { motor_i2cWrite(0x09, 0); motor_i2cWrite(0x0a, 0); motor_i2cWrite(0x05, 0); };
                    break;
                case 7: { motor_i2cWrite(0x09, 0); motor_i2cWrite(0x0a, 0); motor_i2cWrite(0x05, 255); };
                    break;
                case 8: { motor_i2cWrite(0x09, 255); motor_i2cWrite(0x0a, 255); motor_i2cWrite(0x05, 255); };
                    break;
            }
        }
    }

    /**
    * Ultrasonic sensor
    */
    const TRIG_PIN = DigitalPin.P14;
    const ECHO_PIN = DigitalPin.P15;
    pins.setPull(TRIG_PIN, PinPullMode.PullNone);
    let lastTime = 0;
    //% block="Ultrassónico"
    //% group="Sensor Ultrassónico" weight=67
    export function ultra(): number {
        //send trig pulse
        pins.digitalWritePin(TRIG_PIN, 0)
        control.waitMicros(2);
        pins.digitalWritePin(TRIG_PIN, 1)
        control.waitMicros(10);
        pins.digitalWritePin(TRIG_PIN, 0)

        // read echo pulse  max distance : 6m(35000us)
        //2020-7-6 
        // pins.pulseIn():This function has a bug and returns data with large errors.
        let t = pins.pulseIn(ECHO_PIN, PulseValue.High, 35000);
        let ret = t;

        //Eliminate the occasional bad data
        if (ret == 0 && lastTime != 0) {
            ret = lastTime;
        }
        lastTime = t;
        //2020-7-6
        //It would normally divide by 58, because the pins.pulseIn() function has an error, so it's divided by 58
        return Math.round(ret / 58);
    }

    /**
     * photoresistance sensor
     */
    //% block="Lado Esquerdo "
    //% group="Sensor fotoresistência" weight=66
    export function PH1(): number {
        return pins.analogReadPin(AnalogPin.P1);
    }

    //% block="Lado Direito "
    //% group="Sensor fotoresistência" weight=66
    export function PH2(): number {
        return pins.analogReadPin(AnalogPin.P0);
    }

    /**
* return 0b01 or 0b10
* 0b01 is the sensor on the left
* 0b10 is the sensor on the right
*/
    pins.setPull(DigitalPin.P12, PinPullMode.PullUp);
    pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
    //% block="Seguimento de linha"
    //% group="Line Tracking" weight=68
    export function LineTracking(): number {
        let val = pins.digitalReadPin(DigitalPin.P12) << 0 | pins.digitalReadPin(DigitalPin.P13) << 1;
        return val;
    }

    //% block="Deixar servo no ângulo: %angle"
    //% group="Servo" weight=69
    //% angle.min=0 angle.max.max=180
    export function setServo(angle: number): void {
        pins.servoWritePin(AnalogPin.P2, angle)
    }
}
basic.forever(function () {
    JuniBot.led_rgb(LED_rgb_L_R.LED_R, LED_color.cyan)
    JuniBot.led_rgb(LED_rgb_L_R.LED_L, LED_color.purple)
    JuniBot.motor(Motorlist.M1, Direction1.Forward, 138)
    JuniBot.motor(Motorlist.M2, Direction1.Forward, 130)
})
