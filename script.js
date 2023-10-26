class Calculations{

    constructor(tseq, tpar, proc){
        this.tseq = tseq
        this.tpar = tpar
        this.proc = proc
    }

    amdahlsFunction(){
        // p is a fraction of the computational time (parallel percentage) where s + p = 1 for normalization, 1 - p = s
        let totalTime = (this.tpar * this.proc)
        let p = totalTime/(this.tseq + totalTime)
        let s = (1 - p)
        let calculation = parseFloat( 1 / (s + (p/this.proc)) )
        return [p, s, calculation]
    }

    gustafsonsFunction(){

        let p = this.tpar/(this.tseq + this.tpar)
        let s = (1 - p)
        let calculation = parseFloat( (1 - p) + this.proc * p )
        return calculation
    }
    getValues(){
        return {
            tseq: this.tseq,
            tpar: this.tpar,
            proc: this.proc
        }
    }

    setValues(tseq, tpar, proc){
        this.tseq = tseq
        this.tpar = tpar
        this.proc = proc
    }
}

const TSEQ = 10
const TPAR = 40
let calc = new Calculations(TSEQ, TPAR, 10)

let intArr = [...new Array(50)].map((v, i) => (i == 0) ? 1 : i)

let amdahlData = intArr.map((v, i) =>{
    calc.setValues(TSEQ, TPAR, v)
    let a = calc.amdahlsFunction()
    let proc = calc.getValues()
    console.log(proc.proc)
    return [a[0], proc.proc]
})


console.log(amdahlData)


anychart.onDocumentReady(function () {
    // create data set on our data
    var dataSet = anychart.data.set(amdahlData);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var firstSeriesData = dataSet.mapAs({ x: 1, value: 0 });

    // create line chart
    var chart = anychart.line();

    // turn on chart animation
    chart.animation(true);

    // set chart padding
    chart.padding([10, 20, 5, 20]);

    // turn on the crosshair
    chart.crosshair().enabled(true).yLabel(false).yStroke(null);

    // set tooltip mode to point
    chart.tooltip().positionMode('point');

    // set chart title text settings
    chart.title(
      'Amdahls sequential speed as function of N'
    );

    // set yAxis title
    chart.yAxis().title('Sequential percentage %');
    chart.xAxis().title('Number of Processors').labels().padding(5);

    // create first series with mapped data
    var firstSeries = chart.line(firstSeriesData);
    firstSeries.name('Amdahls Sequential data');
    firstSeries.hovered().markers().enabled(true).type('circle').size(4);
    firstSeries
      .tooltip()
      .position('right')
      .anchor('left-center')
      .offsetX(5)
      .offsetY(5);

    // turn the legend on
    chart.legend().enabled(true).fontSize(13).padding([0, 0, 10, 0]);

    // set container id for the chart
    chart.container('container');
    // initiate chart drawing
    chart.draw();
  });


























