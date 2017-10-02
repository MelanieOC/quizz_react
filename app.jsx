const preguntas = [
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
const RedesSociales = () => {
  return (
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
  );
}

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.preguntas=props.preguntas;
    this.marcar=true;
    this.state = {
      contar: 0,
      respuestas: [],
      correctas: 0,
      completo: false,
      comparar: false
    }
  }
  siguiente() {
    if (this.state.contar === this.preguntas.length - 1) {
      this.setState({
        completo: true
      });
    }
    this.setState({
      contar: this.state.contar + 1
    })

  }
  anterior(){
    if (this.state.contar === this.preguntas.length) {
      this.setState({
        completo: false
      });
    }
    this.setState({
      contar: this.state.contar - 1
    })
  }
  guardarRespuesta(evento, value) {
   if(this.marcar){
     this.marcar=false;
    let res = this.state.respuestas;
    res[this.state.contar] = value;
    this.setState({
      respuestas: res
    })
    if (value == this.preguntas[this.state.contar].respuesta) {
      this.setState({
        correctas: this.state.correctas + 1
      })
    }
    let t = setTimeout(()=>{
      this.marcar=true;
      this.siguiente();
    }, 700);
   }
  }
  opciones(opciones) {
    return Object.keys(opciones).map((key, index) => {
      let value = opciones[key];
      return (<div className={this.state.respuestas[this.state.contar]==value?'col-md-4 seleccionado':'col-md-4'}>
        <button className='btn' key={index} onClick={(e) => this.guardarRespuesta(e.currentTarget, value)}><span className='letra'>{key}</span>{value}</button>
      </div>);
    })
  }
  crearPreguntas() {
    return (
      <div>
        <h1 className="text-center"> {this.preguntas[this.state.contar].pregunta} </h1>
        <div className="opciones row">
          {this.opciones(this.preguntas[this.state.contar].opciones)}
        </div>
      </div>
    );
  }
  listarRespuestas() {
    return (
      <div id='respuestas'>
        <h1 className="text-center">
          {!this.state.comparar && 'Here are you answers:'}
          {this.state.comparar && this.state.correctas===0 && 'Ooops, ' + this.state.correctas + ' out of ' + this.preguntas.length + ' correct!'}
          {this.state.comparar && this.state.correctas===this.preguntas.length && 'Wow, ' + this.state.correctas + ' out of ' + this.preguntas.length + ' correct!'}
          {this.state.comparar &&  this.state.correctas + ' out of ' + this.preguntas.length + ' correct!'}
        </h1>
        {this.state.respuestas.map((a, i) => {
          if (a == this.preguntas[i].respuesta && this.state.comparar) {
            return <p className="text-success">{i + 1}. {this.preguntas[i].pregunta}<strong>{a}</strong></p>
          } else if (this.state.comparar) {
            return <p className="text-danger">{i + 1}. {this.preguntas[i].pregunta}<strong><strike>{a}</strike> {this.preguntas[i].respuesta}</strong></p>
          } else {
            return <p>{i + 1}. {this.preguntas[i].pregunta}<strong>{a}</strong></p>;
          }
        })
        }
        <div className='text-center'>
          {this.state.comparar && <button className='btn-lg btn-dark' onClick={() => this.reiniciar()}>Start Again</button>}
          {!this.state.comparar && <button className='btn-lg btn-dark' onClick={() => this.comparar()}>Submit</button>}
        </div>

      </div>
    );

  }
  
  comparar() {
    this.setState({
      comparar: true
    });
  }
  reiniciar(){
    this.setState({
      contar: 0,
      respuestas: [],
      correctas: 0,
      completo: false,
      comparar: false
    });
  }
  render() {
    return (
      <div className="container">
        <header className="text-center">
          {!this.state.completo && <img src={this.preguntas[this.state.contar].imagen} />}
          {this.state.completo && <img src="assets/img/truck.svg" />}
        </header>
        <div className="content">
          {!this.state.comparar &&
            <div id="progreso">
              <div className="progress-label">
                {this.state.respuestas.length} of {this.preguntas.length} answered
            </div>
              <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuemax="100" style={{ width: this.state.respuestas.length * 20 + '%', height: '5px' }}>
                </div>
              </div>
            </div>
          }
          <div id="prueba">
            {!this.state.completo && this.crearPreguntas()}
            {this.state.completo && this.listarRespuestas()}
          </div>
          <RedesSociales />
        </div>
        {!this.state.comparar && this.state.respuestas.length != 0 &&
          <div id="flechas" className="text-center">
            <button id="anterior" className={this.state.respuestas.length>=this.state.contar&&this.marcar&&this.state.contar?'btn':"btn disabled"} onClick={()=>this.anterior()}>
              <img className="img-responsive" src="assets/img/navigation-left-arrow.svg" alt="" />
            </button>
            <button id="siguiente" className={this.state.respuestas.length>this.state.contar&this.marcar?'btn':"btn disabled"} onClick={()=>this.siguiente()}>
              <img className="img-responsive" src="assets/img/navigation-right-arrow.svg" alt="" />
            </button>
          </div>
        }
      </div>);
  }
}


ReactDOM.render(<Application preguntas={preguntas}/>, document.getElementById('container'));