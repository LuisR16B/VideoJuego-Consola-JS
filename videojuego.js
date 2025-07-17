/*
  Crea un videojuego que tenga las siguientes clases:
  - personaje: Clase base para todos los personajes del juego.
  - guerrero: Clase que hereda de personaje y representa a un guerrero.
  - mago: Clase que hereda de personaje y representa a un mago.
  - arquero: Clase que hereda de personaje y representa a un arquero.

  personaje tiene las siguientes propiedades y metodos:
  - nombre: Nombre del personaje.
  - vida: Vida del personaje.
  - daño: Daño del personaje.
  - defensa: Defensa del personaje.
  - velocidad: Velocidad del personaje.
  - atacar(): Metodo utilizado para atacar (con los puños).
  - saludar(): Método utilizado para saludar indicando nombre y clase.

  guerrero tiene las siguientes propiedades y metodos:
  - array_de_armas: Armas que puede usar el guerrero.
  - atacar_con_arma(): Método utilizado para atacar con un arma aleatoria del array.

  mago tiene las siguientes propiedades y metodos:
  - array_de_hechizos: Hechizos que puede usar el mago.
  - atacar_con_hechizo(): Método utilizado para atacar con un hechizo aleatorio del array.

  arquero tiene las siguientes propiedades y metodos:
  - array_de_flechas: Flechas que puede usar el arquero.
  - disparar(): Método utilizado para disparar una flecha aleatoria del array.

  Debes de crear al menos 5 personajes, al menos 2 deben de ser guerreros, 2 magos y 1 arquero.

  Al iniciar el juego, cada personaje debe saludar indicando su nombre y clase.

  Luego habrá una ronda de ataques. En cada ronda, cada personaje atacará a otro personaje de forma aleatoria.

  Cada personaje solo puede atacar una vez por ronda.

  Además, el orden de la ronda debe ser determinado de forma aleatoria pero tomando en cuenta la velocidad de cada personaje.

  Para ello debes jugar con las probabilidades de cada personaje, por ejemplo:
  - Si el personaje tiene una velocidad de 10, debes generar un numero aleatorio entre 1 y 10.
  - Según el numero aleatorio generado, será determinado el orden de ataque de cada personaje en esa ronda

  Ejemplo:
  Personaje 1: 5
  Personaje 2: 8
  Personaje 3: 2
  Personaje 4: 10
  Personaje 5: 6

  El personaje 4 atacará primero, luego el personaje 2, luego el personaje 5, luego el personaje 1 y por último el personaje 3.

  Cuando un personaje ataque a otro, se utilizara la siguiente lógica:

  El personaje atacado se intentara defender, este generara un numero aleatorio entre 1 y su defensa.
  Si el numero aleatorio es mayor que el daño del atacante, el ataque falla y no se le resta vida al personaje atacado.
  Si el numero aleatorio es menor o igual al daño del atacante, el ataque tiene éxito y se le resta vida al personaje atacado.

  Al momento de atacar, se debe mostrar un mensaje indicando quién ataca a quién y si el ataque fue exitoso o fallido.

  Además, hay un tercio de posibilidades de que un personaje ataque con sus puños y dos tercios de posibilidades de que ataque con su arma, hechizo o flecha (según su clase).

  Cuando la vida de un personaje llegue a 0, este será eliminado del juego y no podrá atacar más.
  El juego termina cuando solo quede un personaje con vida.

  Es importante que cuando un personaje muera, se muestre un mensaje indicando que ha muerto y que no puede atacar más.
  Además, al final del juego, se debe mostrar un mensaje indicando quién es el ganador.

  El juego es ganado por el personaje que quede con vida al final.

  Nota: es importante imprimir cada numero de ronda
  ejemplo: "Ronda 1", "Ronda 2", etc.

  Puntos opcionales:
  - Implementa un sistema de habilidades especiales para cada clase, estas habilidades solo se pueden ser utilizadas una vez por juego.
  - Implementa un inventario y objetos para cada personaje, los cuales pueden ser utilizados para mejorar sus habilidades o recuperar vida, sin embargo
  Estos consumirán un turno de ataque y tienen un número limitado de usos.
  - Agrega la clase "vampiro" cuyos ataques regenerar un % aleatorio de vida al personaje.
  - Agrega la posibilidad de 1 entre 10 de que un personaje se tropiece y no pueda hacer nada en esa ronda.
*/

class Personaje{
  constructor(nombre, vida, danho, defensa, velocidad, habilidadesEspeciales){
    this.nombre = nombre;
    this.vida = vida;
    this.danho = danho;
    this.defensa = defensa;
    this.velocidad = velocidad;
    this.habilidadesEspeciales = habilidadesEspeciales;
    this.turno = 0;
    this.ataqueUsado = 1;
  }
  atacar() {
    return Math.floor(Math.random() * this.danho);
  }
  defender(){
    return Math.floor(Math.random() * this.defensa);
  }
  saludar(){
    this.saludo = `Hola, soy ${this.nombre} y soy un`;
  }
  escogerInventario(){
    this.inventario = [{vida:20},{danho:20}];
  }
}

class Guerrero extends Personaje{
  constructor(nombre, vida, danho, defensa, velocidad, habilidadesEspeciales, array_de_armas){
    super(nombre, vida, danho, defensa, velocidad, habilidadesEspeciales);
    this.array_de_armas = array_de_armas;
  }
  atacar_con_arma() {
    return this.array_de_armas[Math.floor(Math.random() * this.array_de_armas.length)];
  }
  saludar(){
    super.saludar();
    console.log(this.saludo += " guerrero.");
  }
  habilidadEspeciales() {
    if(this.ataqueUsado === 1){
      this.ataqueUsado = 0;
      return this.habilidadesEspeciales[Math.floor(Math.random() * this.habilidadesEspeciales.length)];
    }else{
      return this.ataqueUsado;
    }
  }
  escogerInventario() {
    super.escogerInventario();
    let inventarioRandom = Math.floor(Math.random() * this.inventario.length);
    if(this.inventario[inventarioRandom].vida){
      this.vida += Math.floor(Math.random() * this.inventario[inventarioRandom].vida);
      console.log(`${this.nombre} ha recuperado ${this.inventario[inventarioRandom].vida} de vida.`);
    }else{
      let danhoAleatorio = Math.floor(Math.random() * this.inventario[inventarioRandom].danho);
      this.danho += danhoAleatorio;
      this.array_de_armas.danho += danhoAleatorio;
      this.habilidadesEspeciales.danho += danhoAleatorio;
      console.log(`${this.nombre} su danho ha aumentado a mas ${danhoAleatorio}, y no ataca en esta ronda.`);
    }
  }
}

class Mago extends Personaje{
  constructor(nombre, vida, danho, defensa, velocidad, habilidadesEspeciales, array_de_hechizos){
    super(nombre, vida, danho, defensa, velocidad, habilidadesEspeciales);
    this.array_de_hechizos = array_de_hechizos;
  }
  atacar_con_hechizo() {
    return this.array_de_hechizos[Math.floor(Math.random() * this.array_de_hechizos.length)];
  }
  saludar(){
    super.saludar();
    console.log(this.saludo += " mago.");
  }
  habilidadEspeciales() {
    if(this.ataqueUsado === 1){
      this.ataqueUsado = 0;
      return this.habilidadesEspeciales[Math.floor(Math.random() * this.habilidadesEspeciales.length)];
    }else{
      return this.ataqueUsado;
    }
  }
  escogerInventario() {
    super.escogerInventario();
    let inventarioRandom = Math.floor(Math.random() * this.inventario.length);
    if(this.inventario[inventarioRandom].vida){
      this.vida += Math.floor(Math.random() * this.inventario[inventarioRandom].vida);
      console.log(`${this.nombre} ha recuperado ${this.inventario[inventarioRandom].vida} de vida.`);
    }else{
      let danhoAleatorio = Math.floor(Math.random() * this.inventario[inventarioRandom].danho);
      this.danho += danhoAleatorio;
      this.array_de_hechizos.danho += danhoAleatorio;
      this.habilidadesEspeciales.danho += danhoAleatorio;
      console.log(`${this.nombre} su danho ha aumentado a mas ${danhoAleatorio}, y no ataca en esta ronda.`);
    }
  }
}

class Arquero extends Personaje{
  constructor(nombre, vida, danho, defensa, velocidad, habilidadesEspeciales, array_de_flechas){
    super(nombre, vida, danho, defensa, velocidad, habilidadesEspeciales);
    this.array_de_flechas = array_de_flechas;
  }
  disparar() {
    return this.array_de_flechas[Math.floor(Math.random() * this.array_de_flechas.length)];
  }
  saludar(){
    super.saludar();
    console.log(this.saludo += " arquero.");
  }
  habilidadEspeciales() {
    if(this.ataqueUsado === 1){
      this.ataqueUsado = 0;
      return this.habilidadesEspeciales[Math.floor(Math.random() * this.habilidadesEspeciales.length)];
    }else{
      return this.ataqueUsado;
    }
  }
  escogerInventario() {
    super.escogerInventario();
    let inventarioRandom = Math.floor(Math.random() * this.inventario.length);
    if(this.inventario[inventarioRandom].vida){
      this.vida += Math.floor(Math.random() * this.inventario[inventarioRandom].vida);
      console.log(`${this.nombre} ha recuperado ${this.inventario[inventarioRandom].vida} de vida.`);
    }else{
      let danhoAleatorio = Math.floor(Math.random() * this.inventario[inventarioRandom].danho);
      this.danho += danhoAleatorio;
      this.array_de_flechas.danho += danhoAleatorio;
      this.habilidadesEspeciales.danho += danhoAleatorio;
      console.log(`${this.nombre} su danho ha aumentado a mas ${danhoAleatorio}, y no ataca en esta ronda.`);
    }
  }
}

class Vampiro extends Personaje{
  constructor(nombre, vida, danho, defensa, velocidad, habilidadesEspeciales, array_de_ataque){
    super(nombre, vida, danho, defensa, velocidad, habilidadesEspeciales);
    this.array_de_ataque = array_de_ataque;
  }
  atacar(){
    this.vida += (this.danho * 0.10);
    super.atacar();
  }
  saludar(){
    super.saludar();
    console.log(this.saludo += " vampiro.");
  }
  ataque(){
    let random = Math.floor(Math.random() * this.array_de_ataque.length)
    this.vida += (this.array_de_ataque[random].danho * 0.10);
    return this.array_de_ataque[random];
  }
  habilidadEspeciales() {
    let random = Math.floor(Math.random() * this.habilidadesEspeciales.length);
    if(this.ataqueUsado === 1){
      this.ataqueUsado = 0;
      this.vida += (this.habilidadesEspeciales[random].danho * 0.10);
      return this.habilidadesEspeciales[random];
    }else{
      return this.ataqueUsado;
    }
  }
  escogerInventario(){
    super.escogerInventario();
    let inventarioRandom = Math.floor(Math.random() * this.inventario.length);
    if(this.inventario[inventarioRandom].vida){
      this.vida += Math.floor(Math.random() * this.inventario[inventarioRandom].vida);
      console.log(`${this.nombre} ha recuperado ${this.inventario[inventarioRandom].vida} de vida.`);
    }else{
      let danhoAleatorio = Math.floor(Math.random() * this.inventario[inventarioRandom].danho);
      this.danho += danhoAleatorio;
      this.array_de_ataque.danho += danhoAleatorio;
      this.habilidadesEspeciales.danho += danhoAleatorio;
      console.log(`${this.nombre} su danho ha aumentado a mas ${danhoAleatorio}, y no ataca en esta ronda.`);
    }
  }
}

let personajes = [
  new Guerrero("Goliat", 120, 30, 15, 8, [{habilidad:"Golpe doble", danho:50}, {habilidad:"Golpe sismico", danho:45}], [{arma:"Espada", danho:35}, {arma:"Martillo", danho:40}]),
  new Guerrero("Thor", 125, 40, 20, 6, [{habilidad:"Rayo", danho:60}, {habilidad:"Tormenta", danho:55}],[{arma:"Hacha", danho:45}, {arma:"Lanza", danho:50}]),
  new Mago("Merlín", 105, 25, 10, 7, [{habilidad:"Lluvia de fuego", danho:45}, {habilidad:"Esfera de energia", danho:35}], [{hechizo:"Bola de Fuego", danho:30}, {hechizo:"Rayo", danho:35}]),
  new Mago("Gandalf", 95, 35, 12, 5, [{habilidad:"Tormenta Arcana", danho:50}], [{hechizo:"Telequinesis", danho:20}, {hechizo:"Escudo", danho:35}]),
  new Arquero("Legolas", 110, 20, 8, 9, [{habilidad:"lluvia de flechas", danho:45}, {habilidad:"Disparo certero", danho:50}], [{flecha:"Flecha de Fuego", danho:25}, {flecha:"Flecha de Hielo", danho:30}]),
  new Vampiro("Drácula", 70, 30, 15, 7, [{habilidad:"Mordisco", danho:40}, {habilidad:"Transformación", danho:50}], [{ataque:"Ataque Vampírico", danho:35}, {ataque:"Ataque Sombrío", danho:40}])
];

function iniciarJuego(personajes) {
  let ronda = 1;
  let posibilidadAtaque;
  // Saludo
  console.log("* * * Bienvenidos al juego * * *\nLos Personajes son:\n");
  saludar(personajes);
  console.log("\nInicia el juego...");
  // Iniciar el bucle de juego
  do {
    console.log(`\n* * * Ronda ${ronda++} * * *`);
    // Funcion para organizar el turno de los personajes
    turnoPersonajeAleatoreo(personajes).forEach(personaje => {
      console.log(personaje.vida+" - "+ personaje.nombre)
      // Validar si el personaje esta vivo
      if(personaje.vida <= 0) return;
      //validar si se tropieza y pierde el turno
      if(Math.floor(Math.random() * 100) < 10){
        console.log(`${personaje.nombre} se tropieza y no puede atacar en esta ronda.`);
        return;
      }
      // Validar si se puede usar el inventario
      if(Math.floor(Math.random() * 100) < 10){
        personaje.escogerInventario();
        return;
      }
      // Variable para determinar el tipo de ataque
      posibilidadAtaque = Math.random();
      // Validar si atacar con puños o con el ataque del personaje
      if(posibilidadAtaque <= (1/3)){
        ataquePunho(personajes, personaje);
      }else{
        ataquePersonaje(personajes, personaje);
      }
    });
  }while (personajes.filter(personaje => personaje.vida > 0).length > 1);
  console.log("\n* * * El juego ha terminado * * *");
  // Mostrar el ganador
  console.log(`${personajes.find(personaje => personaje.vida > 0).nombre} es el ganador!`);
}
// Funcion para mostrar los saludos de los personajes
function saludar(personajes){
  personajes.forEach(personaje => {
    personaje.saludar();
  });
}
// Funcion para ordenar el turno de los personajes
function turnoPersonajeAleatoreo(personajes){
  let personajesVivos = personajes.filter(personaje => personaje.vida > 0);
  personajesVivos.forEach(personaje => {
    personaje.turno = Math.floor(Math.random() * personaje.velocidad);
  });
  return personajesVivos.sort((a,b) => b.turno - a.turno);
}
// Funcion para atacar con los puños
function ataquePunho(personajes, personaje){
  let random = numeroRandom(personajes, personaje);
  let danhoAleatoreo = personaje.atacar();
  let defensaAleatoria = personajes[random].defender();
  if(defensaAleatoria < danhoAleatoreo){
    console.log(`${personaje.nombre} ataca a ${personajes[random].nombre} con sus puños y el ataque es exitoso.`);
    personajes[random].vida -= danhoAleatoreo;
    // Evaluar la vida del personaje atacado para ver si sigue vivo
    evaluandoVidaPersonaje(personajes, random);
  }else{
    console.log(`${personajes[random].nombre} bloquea el ataque de ${personaje.nombre}.`);
  }
}
// funcion para el ataque de los personajes
function ataquePersonaje(personajes, personaje){
  // Validar que tipo de personaje es
  if(personaje instanceof  Guerrero){
    // validar si el ataque es especial o con arma
    if(Math.floor(Math.random() * 100) < 10 && personaje.ataqueUsado === 1){
      evaluarAtaquePersonaje(personaje.habilidadEspeciales(), personaje, personajes, 'especial');
    }else{
      evaluarAtaquePersonaje(personaje.atacar_con_arma(), personaje, personajes);
    }
  }else if(personaje instanceof Mago){
    // validar si el ataque es especial o con hechizo
    if(Math.floor(Math.random() * 100) < 10 && personaje.ataqueUsado === 1){
      evaluarAtaquePersonaje(personaje.habilidadEspeciales(), personaje, personajes, 'especial');
    }else{
      evaluarAtaquePersonaje(personaje.atacar_con_hechizo(), personaje, personajes);
    }
  }else if(personaje instanceof Arquero){
    // validar si el ataque es especial o con flecha
    if(Math.floor(Math.random() * 100) < 10 && personaje.ataqueUsado === 1){
      evaluarAtaquePersonaje(personaje.habilidadEspeciales(), personaje, personajes, 'especial');
    }else{
      evaluarAtaquePersonaje(personaje.disparar(), personaje, personajes);
    }
  }else{
    if(Math.floor(Math.random() * 100) < 10 && personaje.ataqueUsado === 1){
      evaluarAtaquePersonaje(personaje.habilidadEspeciales(), personaje, personajes, 'especial');
    }else{
      evaluarAtaquePersonaje(personaje.ataque(), personaje, personajes);
    }
  }
}
// Funcion para evaluar el ataque del personaje
function evaluarAtaquePersonaje(ataque, personaje, personajes, tipoAtaque){
  let random = numeroRandom(personajes, personaje);
  let defensaAleatoria = personajes[random].defender();
  let danhoAleatoreo = Math.floor(Math.random() * ataque.danho);
  // validar si se realiza el ataque o lo bloquea
  if(defensaAleatoria < danhoAleatoreo){
    // Validar si es un ataque especial
    if(tipoAtaque === 'especial'){
      console.log(`${personaje.nombre} ataca a ${personajes[random].nombre} con su habilidad especial ${ataque.habilidad} y el ataque es exitoso.`);
      personajes[random].vida -= danhoAleatoreo;
    }else {
      console.log(`${personaje.nombre} ataca a ${personajes[random].nombre} con su ${ataque.arma || ataque.hechizo || ataque.flecha || ataque.ataque} y el ataque es exitoso.`);
      personajes[random].vida -= danhoAleatoreo;
    }
    evaluandoVidaPersonaje(personajes, random);
  }else{
    console.log(`${personajes[random].nombre} bloquea el ataque de ${personaje.nombre}.`);
  }
}
// Funcion para evaluar la vida del personaje
function evaluandoVidaPersonaje(personajes, random){
  // evaluar si el personaje sigue vivo
  if (personajes[random].vida <= 0){
      console.log(`* * * ${personajes[random].nombre} a sido eliminado y no podra seguir atacando * * *`)
    }
}
// Funcion para generar un numero random para atacar a otro personaje
function numeroRandom(personajes, personaje){
  let random;
  do{
     random = Math.floor(Math.random() * personajes.length);
  }while(personajes[random].nombre === personaje.nombre || personajes[random].vida <= 0);
  return random;
}

iniciarJuego(personajes);