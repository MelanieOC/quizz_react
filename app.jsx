let preguntas = [
  {
    pregunta: 'Which is the oldest airline in the world?',
    opciones: { A: 'Avianca', B: 'KLM', C: 'Qantas' },
    respuesta: 'KLM',
    imagen: 'assets/img/plane.svg'
  },
  {
    pregunta: 'Which is the largest port in the world?',
    opciones: { A: 'Port of Shanghai', B: 'Port of Singapore', C: 'Port of Rotterdam' },
    respuesta: 'Port of Shanghai',
    imagen: 'assets/img/ship.svg'
  },
  {
    pregunta: 'What is the longest distance cycling backwards?',
    opciones: { A: '89.30 km', B: '675.10 km', C: '337.60 km' },
    respuesta: '337.60 km',
    imagen: 'assets/img/bycicle.svg'
  },
  {
    pregunta: 'What is the highest speed ever reached by a school bus?',
    opciones: { A: '590 km/h', B: '320 km/h', C: '245 km/h' },
    respuesta: '590 km/h',
    imagen: 'assets/img/bus.svg'
  },
  {
    pregunta: 'What is the longest car trip on one tank of gas?',
    opciones: { A: '2617 km', B: '3568 km', C: '1732 km' },
    respuesta: '2617 km',
    imagen: 'assets/img/car.svg'
  }
]
class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contar: 0,
      progreso:0,
      respuestas:null
    }
  }
  siguiente(){
    this.setState({
      contar: this.state.contar + 1,
    })
  }
  guardarRespesta(){
    
  }
  opciones(opciones) {
    return Object.keys(opciones).map(key => {
      let value = opciones[key];
      return (<div className='col-md-4'>
        <button className="btn" key={key} onClick={()=>this.guardarRespesta()}><span className='letra'>{key}</span>{value}</button>
      </div>);
    })
  }
  render() {
    return (
      <div className="container">
        <header className="text-center">
          <img src={preguntas[this.state.contar].imagen} />
        </header>
        <div className="content">
          <div id="progreso">
            <div className="progress-label"></div>
            <div className="progress">
              <div className="progress-bar" role="progressbar" aria-valuemax="100" style={{ width:`${this.state.progreso}%`, height: '5px' }}>
              </div>
            </div>
          </div>
          <div id="prueba">
            <h1 className="text-center"> {preguntas[this.state.contar].pregunta} </h1>
            <div className="opciones row">
              {this.opciones(preguntas[this.state.contar].opciones)}
            </div>
          </div>
          <div id="redesSociales" className="text-center">
            <a href="#" className="fa-stack fa-lg" style={{ color: '#00C3FF' }}>
              <i className="fa fa-circle fa-stack-2x"></i>
              <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
            </a>
            <a href="#" className="fa-stack fa-lg">
              <i className="fa fa-circle fa-stack-2x" style={{ color: '#23239B' }}></i>
              <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
            </a>
            <a href="#" className="fa-stack fa-lg">
              <i className="fa fa-circle fa-stack-2x" style={{ color: 'red' }}></i>
              <i className="fa fa-google-plus fa-stack-1x fa-inverse"></i>
            </a>
          </div>
        </div>
        <div id="flechas" className="text-center">
          <button id="anterior" className="btn disabled">
            <img className="img-responsive" src="assets/img/navigation-left-arrow.svg" alt="" />
          </button>
          <button id="siguiente" className="btn disabled">
            <img className="img-responsive" src="assets/img/navigation-right-arrow.svg" alt="" />
          </button>
        </div>
      </div>);
  }
}


ReactDOM.render(<Application />, document.getElementById('container'));