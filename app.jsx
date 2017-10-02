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
const lista=(props)=>{
  return (
    <div id='respuestas'>
      <h1 class="text-center">props.title</h1>
      {props.array.map((a, i) => {
        if(a==preguntas[i].respuesta && props.comparar){
          return <p className="text-success">{i + 1}. {preguntas[i].pregunta}<strong>{a}</strong></p>
        } else if(props.comparar) {
          return <p className="text-danger">{i + 1}. {preguntas[i].pregunta}<strong><strike>{a}</strike> {preguntas[i].respuesta}</strong></p>
        }else{
          return <p>{i + 1}. {preguntas[i].pregunta}<strong>{a}</strong></p>;
        }
      })
      }
      <button className='btn-lg btn-dark' onClick={()=>props.funcion()}>{props.boton}</button>
    </div>
  );
}
class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contar: 0,
      respuestas: [],
      completo: false,
      enviado:false
    }
  }
  siguiente() {
    if (this.state.contar === preguntas.length - 1) {
      this.setState({
        completo: true
      });
    }
    this.setState({
      contar: this.state.contar + 1
    })
    console.log(this.state.respuestas)
  }
  guardarRespuesta(evento, value) {
    let res = this.state.respuestas;
    res[this.state.contar] = value;
    this.setState({
      respuestas: res
    })
    this.siguiente();
  }
  opciones(opciones) {
    return Object.keys(opciones).map((key, index) => {
      let value = opciones[key];
      return (<div className='col-md-4'>
        <button className="btn" key={index} onClick={(e) => this.guardarRespuesta(e.currentTarget, value)}><span className='letra'>{key}</span>{value}</button>
      </div>);
    })
  }
  preguntas() {
    return (
      <div>
        <h1 className="text-center"> {preguntas[this.state.contar].pregunta} </h1>
        <div className="opciones row">
          {this.opciones(preguntas[this.state.contar].opciones)}
        </div>
      </div>
    );
  }
  listarRespuestas() {
    return (
      <div id='respuestas'>
        <h1 class="text-center">Here are your answer:</h1>
        {this.state.respuestas.map((a, i) => {
          return (
            <p>{i + 1}. {preguntas[i].pregunta}<strong>{a}</strong></p>
          );
        })
        }
        <button className='btn-lg btn-dark' onClick={()=>this.comparar()}>Submit</button>
      </div>
    );

  }
 /* let expresion='';
  if(this.state.correctas==0){
    expresion='Ooops, ';
  } else if(this.state.correctas==preguntas.length) {
    expresion='Wow, ';
  } 
  <h1 class="text-center">{expresion}{this.state.correctas} out of {preguntas.length} correct!</h1>*/
  comparar(){
    this.setState({    
      enviado: true
    });
    return (
      <div id='respuestas'>
        {this.state.respuestas.map((a, i) => {
          if(a==preguntas[i].respuesta){
            return <p className="text-success">{i + 1}. {preguntas[i].pregunta}<strong>{a}</strong></p>
          } else {
            return <p className="text-danger">{i + 1}. {preguntas[i].pregunta}<strong><strike>{a}</strike> {preguntas[i].respuesta}</strong></p>
          }
        })
        }
        <button className='btn-lg btn-dark' onClick={this.comparar}>Submit</button>
      </div>
    );
  }
  render() {
    return (
      <div className="container">
        <header className="text-center">
          {!this.state.completo && <img src={preguntas[this.state.contar].imagen} />}
          {this.state.completo && <img src="assets/img/truck.svg" />}
        </header>
        <div className="content">
          <div id="progreso">
            <div className="progress-label">
              {this.state.contar} of {preguntas.length} answered
            </div>
            <div className="progress">
              <div className="progress-bar" role="progressbar" aria-valuemax="100" style={{ width: this.state.contar * 20 + '%', height: '5px' }}>
              </div>
            </div>
          </div>
          <div id="prueba">
            {!this.state.completo && !this.state.enviado && this.preguntas()}
            {this.state.completo && this.listarRespuestas()}
            {this.state.enviado && this.comparar()}
          </div>
          <RedesSociales />
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