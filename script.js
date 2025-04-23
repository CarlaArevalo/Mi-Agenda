document.addEventListener('DOMContentLoaded', function () {
    // Inicializar calendario
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      height: 600,
      events: []
    });
    calendar.render();
  
    // Función para enviar datos al Web App
    function enviarDatos(data) {
      fetch('TU_URL_DEL_WEBAPP', {
        method: 'POST',
        body: new URLSearchParams(data)
      })
      .then(res => res.text())
      .then(msg => console.log(msg))
      .catch(err => console.error(err));
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
        enviarDatos({ sheet: 'Tareas_Pendientes', fecha, pendiente: `${titulo} [${prioridad}]` });
        calendar.addEvent({ title: `${titulo} (${prioridad})`, start: fecha });
        document.getElementById('fechaPendiente').value = '';
        document.getElementById('tituloTarea').value = '';
        document.getElementById('prioridadTarea').value = '';
        alert('Tarea pendiente registrada');
      }
    };

    function enviarDatos(data) {
        fetch("https://script.google.com/macros/s/AKfycbxPwgpSwxFzf0OSwInu38Dq-FF2UPlgdkvKkhN_Q21_ciYiUsWYu_q3A_D_wGNYKpta/exec", {
          method: "POST",
          body: new URLSearchParams(data)
        });
      }

      document.addEventListener('DOMContentLoaded', function () {
        const calendarEl = document.getElementById('calendar');
        const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          height: 600,
          events: []
        });
        calendar.render();
      });
  });