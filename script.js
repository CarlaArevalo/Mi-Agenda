// document.addEventListener('DOMContentLoaded', function () {
//     // Inicializar calendario
//     const calendarEl = document.getElementById('calendar');
//     const calendar = new FullCalendar.Calendar(calendarEl, {
//       initialView: 'dayGridMonth',
//       height: 600,
//       events: []
//     });
//     calendar.render();
  
//     // Función para enviar datos al Web App
//     function enviarDatos(data) {
//       fetch('TU_URL_DEL_WEBAPP', {
//         method: 'POST',
//         body: new URLSearchParams(data)
//       })
//       .then(res => res.text())
//       .then(msg => console.log(msg))
//       .catch(err => console.error(err));
//     }
  
//     // Tareas realizadas
//     window.agregarTareaRealizada = function () {
//       const tarea = document.getElementById('tareaRealizada').value;
//       if (tarea) {
//         enviarDatos({ sheet: 'Tareas_Realizadas', tarea });
//         document.getElementById('tareaRealizada').value = '';
//         alert('Tarea registrada');
//       }
//     };
  
//     // Reuniones
//     window.agregarReunion = function () {
//       const fecha = document.getElementById('fechaReunion').value;
//       const descripcion = document.getElementById('descripcionReunion').value;
//       if (fecha && descripcion) {
//         enviarDatos({ sheet: 'Reuniones', fecha, reunion: descripcion });
//         calendar.addEvent({ title: 'Reunión: ' + descripcion, start: fecha });
//         document.getElementById('fechaReunion').value = '';
//         document.getElementById('descripcionReunion').value = '';
//         alert('Reunión registrada');
//       }
//     };
  
//     // Tareas pendientes
//     window.agregarPendiente = function () {
//       const fecha = document.getElementById('fechaPendiente').value;
//       const titulo = document.getElementById('tituloTarea').value;
//       const prioridad = document.getElementById('prioridadTarea').value;
//       if (fecha && titulo && prioridad) {
//         enviarDatos({ sheet: 'Tareas_Pendientes', fecha, pendiente: `${titulo} [${prioridad}]` });
//         calendar.addEvent({ title: `${titulo} (${prioridad})`, start: fecha });
//         document.getElementById('fechaPendiente').value = '';
//         document.getElementById('tituloTarea').value = '';
//         document.getElementById('prioridadTarea').value = '';
//         alert('Tarea pendiente registrada');
//       }
//     };

document.addEventListener('DOMContentLoaded', function () {
  // Inicializar calendario
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 600,
    events: [] // Se llenará con los datos del fetch
  });
  calendar.render();

  // Obtener eventos guardados desde Google Sheets (via Web App)
  fetch("https://script.google.com/macros/s/AKfycbw6eaAqRq1-IuTzn-83-0vLrV48qpNoTTG2l_iWmWLwHCADInJNLz_nTN29zUI342mJ/exec")
  .then(res => res.json())
  .then(data => {
    // NO necesitas mapear, los datos ya vienen con title y start
    calendar.addEventSource(data);
  })
  .catch(error => console.error("Error al cargar eventos:", error));

  // Función para enviar datos al Web App
  function enviarDatos(data) {
    fetch("https://script.google.com/macros/s/AKfycbyEV_2ikbZCyLAh9wZ96VisNJfv6xJsCtSdKxkhxEUfzeYhO5w2EHuNB7DjkoRM4n8r/exec", {
      method: "POST",
      body: new URLSearchParams(data)
    })
    .then(res => res.text())
    .then(msg => console.log("Servidor:", msg))
    .catch(err => console.error("Error al guardar:", err));
  }

  // Tareas realizadas
  window.agregarTareaRealizada = function () {
    const tarea = document.getElementById('tareaRealizada').value;
    if (tarea) {
      enviarDatos({ sheet: 'Tareas_Realizadas', tarea });
      document.getElementById('tareaRealizada').value = '';
      alert('Tarea registrada');
    }
  };

  // Reuniones
  window.agregarReunion = function () {
    const fecha = document.getElementById('fechaReunion').value;
    const descripcion = document.getElementById('descripcionReunion').value;
    if (fecha && descripcion) {
      enviarDatos({ sheet: 'Reuniones', fecha, reunion: descripcion });
      calendar.addEvent({ title: 'Reunión: ' + descripcion, start: fecha });
      document.getElementById('fechaReunion').value = '';
      document.getElementById('descripcionReunion').value = '';
      alert('Reunión registrada');
    }
  };

  // Tareas pendientes
  window.agregarPendiente = function () {
    const fecha = document.getElementById('fechaPendiente').value;
    const titulo = document.getElementById('tituloTarea').value;
    const prioridad = document.getElementById('prioridadTarea').value;
    if (fecha && titulo && prioridad) {
      const texto = `${titulo} [${prioridad}]`;
      enviarDatos({ sheet: 'Tareas_Pendientes', fecha, pendiente: texto });
      calendar.addEvent({ title: texto, start: fecha });
      document.getElementById('fechaPendiente').value = '';
      document.getElementById('tituloTarea').value = '';
      document.getElementById('prioridadTarea').value = '';
      alert('Tarea pendiente registrada');
    }
  };
});