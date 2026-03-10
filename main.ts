function _28B_phase (b1: number, b2: number, b3: number, b4: number) {
    pins.digitalWritePin(DigitalPin.P13, b1)
    pins.digitalWritePin(DigitalPin.P14, b2)
    pins.digitalWritePin(DigitalPin.P15, b3)
    pins.digitalWritePin(DigitalPin.P16, b4)
}
function doeAB () {
    if (State == 3) {
        Lanceer()
    }
    if (State == 2) {
        Lanceer()
    }
}
function BevestigSpel () {
    State += 1 + spel
    basic.clearScreen()
}
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    State = 0
    basic.showNumber(kanaal)
})
function VeranderKanaal () {
    kanaal += 1
    if (kanaal > 3) {
        kanaal = 1
    }
    basic.showNumber(kanaal)
}
input.onButtonPressed(Button.A, function () {
    radio.sendString("A")
    DoeA()
})
function Lager () {
    _28B_phase(1, 0, 0, 0)
    basic.pause(3)
    _28B_phase(0, 1, 0, 0)
    basic.pause(3)
    _28B_phase(0, 0, 1, 0)
    basic.pause(3)
    _28B_phase(0, 0, 0, 1)
    basic.pause(3)
    _28B_phase(0, 0, 0, 0)
}
function DoeA () {
    if (State == 3) {
    	
    }
    if (State == 2) {
        for (let index = 0; index < 10; index++) {
            Hoger()
        }
    }
    if (State == 1) {
        Veranderspel()
    }
    if (State == 0) {
        VeranderKanaal()
    }
}
function Hoger () {
    _28B_phase(0, 0, 0, 1)
    basic.pause(3)
    _28B_phase(0, 0, 1, 0)
    basic.pause(3)
    _28B_phase(0, 1, 0, 0)
    basic.pause(3)
    _28B_phase(1, 0, 0, 0)
    basic.pause(3)
    _28B_phase(0, 0, 0, 0)
}
function Veranderspel () {
    if (spel != 0) {
        spel = 0
        basic.showString("A")
    } else {
        spel = 1
        basic.showString("B")
    }
}
function doeB () {
    if (State == 3) {
    	
    }
    if (State == 2) {
        for (let index = 0; index < 10; index++) {
            Lager()
        }
    }
    if (State == 1) {
        BevestigSpel()
    }
    if (State == 0) {
        BevestigKanaal()
    }
}
input.onButtonPressed(Button.AB, function () {
    radio.sendString("C")
    doeAB()
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "C") {
        doeAB()
    }
    if (receivedString == "A") {
        DoeA()
    }
    if (receivedString == "B") {
        doeB()
    }
})
function BevestigKanaal () {
    radio.setGroup(kanaal)
    State += 1
    basic.clearScreen()
    Veranderspel()
}
input.onButtonPressed(Button.B, function () {
    radio.sendString("B")
    doeB()
})
function Ledlanceerlicht () {
    strip.clear()
    for (let index = 0; index <= 9; index++) {
        range = strip.range(9 - index, index + 1)
        range.showColor(neopixel.colors(NeoPixelColors.Green))
        range = strip.range(15, index + 1)
        range.showColor(neopixel.colors(NeoPixelColors.Green))
        basic.pause(100)
    }
}
function Lanceer () {
    pins.digitalWritePin(DigitalPin.P12, 0)
    strip.clear()
    // Turning on the motors causes a voltage drop => Wait a bit to stabilize the voltage before turning on the leds
    basic.pause(500)
    Ledlanceerlicht()
    basic.pause(100)
    servos.P1.setAngle(160)
    basic.pause(2000)
    servos.P1.setAngle(20)
    strip.clear()
    basic.pause(500)
    pins.digitalWritePin(DigitalPin.P12, 1)
    strip.clear()
}
let range: neopixel.Strip = null
let spel = 0
let strip: neopixel.Strip = null
let kanaal = 0
let State = 0
State = 0
kanaal = 1
basic.showNumber(kanaal)
strip = neopixel.create(DigitalPin.P0, 25, NeoPixelMode.RGB_RGB)
servos.P1.setAngle(20)
pins.digitalWritePin(DigitalPin.P12, 1)
strip.showRainbow(1, 22)
basic.pause(2000)
strip.clear()
strip.show()
basic.forever(function () {
    if (State == 3) {
        Hoger()
    }
    if (State == 2) {
    	
    }
    if (State == 1) {
    	
    }
    if (State == 0) {
    	
    }
})
