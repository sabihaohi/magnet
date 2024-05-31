import zim from "https://zimjs.org/cdn/016/zim";

const {Frame, Rectangle, Button, Ticker,Line} = zim;

const frame = new Frame("FIT",1920,1080,"#ffe");
frame.on("ready",()=>{

    const fixedMagnet = new Rectangle(200,100).centerReg();
    const fixedMagnetN = new Rectangle(100,100,"blue");
    const fixedMagnetS = new Rectangle(100,100,"red");
    fixedMagnetS.x = 100;

    fixedMagnet.addChild(fixedMagnetN,fixedMagnetS);

    


});