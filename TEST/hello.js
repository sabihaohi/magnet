import zim from "https://zimjs.org/cdn/016/zim";

const { Frame, Container, Rectangle, Label, Button,Circle } = zim;

const frame = new Frame("fit", 1920, 1080, "#ddd");
frame.on("ready", () => {

   //create fixed magnet
    const fixedMagnet = new Container(240, 120);
    const fixedMagnetN = new Rectangle(120, 120, "red");
    const fixedMagnetS = new Rectangle(120, 120, "blue");
    fixedMagnetS.x=120;

    new Label({text: "N", color: "white", bold: true}).center(fixedMagnetN).mov(-20);
    new Label({text: "S",color:"white",bold:true}).center(fixedMagnetS).mov(20);

   fixedMagnet.addChild(fixedMagnetN,fixedMagnetS);
   fixedMagnet.centerReg();


    //create fixed magnet
    const DragMagnet = new Container(240, 120);
    const dragmagnetS = new Rectangle(120, 120, "red");
    const dragmagnetN = new Rectangle(120, 120, "blue");
    fixedMagnetS.x=120;

    new Label({text: "N", color: "white", bold: true}).center(fixedMagnetN).mov(-20);
    new Label({text: "S",color:"white",bold:true}).center(fixedMagnetS).mov(20);

   fixedMagnet.addChild(fixedMagnetN,fixedMagnetS);
   fixedMagnet.centerReg();





});