export const NotificationAPI = {
    async getAllNotifications() {
        return [
            {
                id: 1,
                title: "Paseo confirmado",
                content: "Tu paseo con Sarah Johnson ha sido confirmado para mañana a las 10:00 AM. Sarah estará en el punto de encuentro acordado. Recuerda tener listo todo lo necesario para tu mascota.",
                type: "success",
                date: "2025-09-06T08:00:00Z",
                read: false,
                walkerName: "Sarah Johnson"
            },
            {
                id: 2,
                title: "Solicitud de paseo cancelada",
                content: "Lamentamos informarte que Mike Wilson ha cancelado tu solicitud de paseo programado para hoy debido a condiciones climáticas adversas. Te recomendamos reagendar para otro día.",
                type: "warning",
                date: "2025-09-05T16:30:00Z",
                read: true,
                walkerName: "Mike Wilson"
            },
            {
                id: 3,
                title: "Nuevo paseador disponible",
                content: "¡Buenas noticias! Emma Davis, una nueva paseadora especializada en entrenamiento conductual, se ha unido a nuestro equipo en tu área. Échale un vistazo a su perfil.",
                type: "info",
                date: "2025-09-05T12:15:00Z",
                read: false,
                walkerName: "Emma Davis"
            },
            {
                id: 4,
                title: "Recordatorio de pago",
                content: "Tu pago por el paseo con John Smith está pendiente. El servicio fue completado el 3 de septiembre. Por favor, procesa el pago para mantener tu cuenta al día.",
                type: "warning",
                date: "2025-09-04T14:00:00Z",
                read: false,
                walkerName: "John Smith"
            },
            {
                id: 5,
                title: "Paseo completado",
                content: "Lisa Rodriguez ha completado exitosamente el paseo de tu mascota. El reporte del paseo ya está disponible en tu historial. ¡Tu mascota tuvo un excelente tiempo!",
                type: "success",
                date: "2025-09-04T11:45:00Z",
                read: true,
                walkerName: "Lisa Rodriguez"
            },
            {
                id: 6,
                title: "Califica tu experiencia",
                content: "¡Tu paseo con Sarah Johnson fue genial! Nos encantaría conocer tu opinión. Califica tu experiencia y ayuda a otros usuarios a tomar mejores decisiones.",
                type: "info",
                date: "2025-09-03T19:20:00Z",
                read: false,
                walkerName: "Sarah Johnson"
            },
            {
                id: 7,
                title: "Oferta especial disponible",
                content: "¡Oferta especial! Obtén un 20% de descuento en tu próximo paseo. Esta oferta es válida hasta el final del mes. Usa el código WALK20 al hacer tu próxima reserva.",
                type: "info",
                date: "2025-09-03T10:00:00Z",
                read: true,
                walkerName: null
            },
            {
                id: 8,
                title: "Actualización de perfil de paseador",
                content: "Mike Wilson ha actualizado su perfil con nuevas certificaciones en entrenamiento canino. Ahora también ofrece servicios especializados para cachorros.",
                type: "info",
                date: "2025-09-02T15:30:00Z",
                read: false,
                walkerName: "Mike Wilson"
            },
            {
                id: 9,
                title: "Solicitud de paseo recibida",
                content: "Emma Davis ha aceptado tu solicitud de paseo para el fin de semana. Te contactará pronto para coordinar los detalles del encuentro y confirmar la hora exacta.",
                type: "success",
                date: "2025-09-02T09:15:00Z",
                read: true,
                walkerName: "Emma Davis"
            },
            {
                id: 10,
                title: "Mantenimiento del sistema",
                content: "El sistema estará en mantenimiento el domingo de 2:00 AM a 4:00 AM. Durante este tiempo, podrías experimentar interrupciones menores en el servicio.",
                type: "warning",
                date: "2025-09-01T18:00:00Z",
                read: false,
                walkerName: null
            },
            {
                id: 11,
                title: "Paseador no disponible",
                content: "John Smith no estará disponible la próxima semana debido a compromisos personales. Te sugerimos contactar a otros paseadores en tu área.",
                type: "warning",
                date: "2025-09-01T13:45:00Z",
                read: true,
                walkerName: "John Smith"
            },
            {
                id: 12,
                title: "Nueva zona de servicio",
                content: "¡Expandimos nuestros servicios! Ahora también cubrimos la zona norte de la ciudad. Encuentra paseadores disponibles en tu nueva área de cobertura.",
                type: "info",
                date: "2025-08-31T16:20:00Z",
                read: false,
                walkerName: null
            },
            {
                id: 13,
                title: "Reporte de paseo disponible",
                content: "El reporte detallado de tu paseo con Lisa Rodriguez ya está disponible. Incluye fotos, rutas tomadas y notas sobre el comportamiento de tu mascota.",
                type: "success",
                date: "2025-08-31T12:00:00Z",
                read: true,
                walkerName: "Lisa Rodriguez"
            },
            {
                id: 14,
                title: "Cambio en horarios de paseador",
                content: "Sarah Johnson ha actualizado sus horarios disponibles. Ahora también ofrece paseos temprano en la mañana y los fines de semana.",
                type: "info",
                date: "2025-08-30T14:30:00Z",
                read: false,
                walkerName: "Sarah Johnson"
            },
            {
                id: 15,
                title: "Felicidades por tu primera reserva",
                content: "¡Bienvenido a nuestra comunidad! Has completado tu primera reserva exitosamente. Esperamos que tengas una excelente experiencia con nuestros servicios.",
                type: "success",
                date: "2025-08-30T08:00:00Z",
                read: true,
                walkerName: null
            }
        ];
    },

    async getNotificationById(id) {
        const notifications = await this.getAllNotifications();
        return notifications.find(notification => notification.id === parseInt(id));
    }
};