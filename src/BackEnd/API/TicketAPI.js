export const TicketAPI = {
    async getFAQs() {
        
        return [
            {
                id: 1,
                question: "¿Cómo puedo restablecer mi contraseña?",
                answer: "Puede restablecer su contraseña haciendo clic en 'Olvidé mi contraseña' en la página de inicio de sesión. Recibirá un correo electrónico con las instrucciones para crear una nueva contraseña.",
                category: "Cuenta de Usuario"
            },
            {
                id: 2,
                question: "¿Cuál es el tiempo de respuesta promedio para las consultas?",
                answer: "Nuestro tiempo de respuesta promedio es de 24-48 horas hábiles. Durante períodos de alta demanda, este tiempo puede extenderse ligeramente.",
                category: "General"
            },
            {
                id: 3,
                question: "¿Cómo puedo cancelar un paseo programado?",
                answer: "Puede cancelar un paseo programado desde su panel de control en la sección 'Mis Paseos'. Tenga en cuenta que las cancelaciones con menos de 2 horas de anticipación pueden estar sujetas a cargos.",
                category: "Servicios de Paseo"
            },
            {
                id: 4,
                question: "¿Los paseadores están asegurados?",
                answer: "Sí, todos nuestros paseadores verificados cuentan con seguro de responsabilidad civil. Además, realizamos verificaciones de antecedentes antes de aprobar a cada paseador.",
                category: "Paseadores"
            },
            {
                id: 5,
                question: "¿Qué métodos de pago aceptan?",
                answer: "Aceptamos tarjetas de crédito (Visa, Mastercard, American Express), tarjetas de débito y transferencias bancarias. Los pagos se procesan de forma segura a través de nuestra plataforma.",
                category: "Facturación"
            },
            {
                id: 6,
                question: "¿Puedo rastrear a mi mascota durante el paseo?",
                answer: "Sí, ofrecemos seguimiento GPS en tiempo real para todos los paseos. Podrá ver la ubicación de su mascota y el recorrido realizado a través de nuestra aplicación móvil.",
                category: "Servicios de Paseo"
            },
            {
                id: 7,
                question: "¿Qué sucede si mi mascota se enferma durante el paseo?",
                answer: "En caso de emergencia médica, nuestros paseadores están capacitados para contactar inmediatamente al veterinario más cercano y a usted. Todos los gastos médicos de emergencia están cubiertos por nuestro seguro.",
                category: "Paseadores"
            },
            {
                id: 8,
                question: "¿Cómo puedo actualizar la información de mi perfil?",
                answer: "Puede actualizar su información personal, datos de contacto y preferencias de su mascota accediendo a 'Mi Cuenta' > 'Configuración de Perfil' desde el menú principal.",
                category: "Cuenta de Usuario"
            }
        ];
    },

    async getTicketsByUser(userId) {
        
        const tickets = [
            {
                id: 1001,
                userId: userId,
                subject: "Problema con la aplicación móvil",
                message: "La aplicación se cierra inesperadamente cuando intento programar un nuevo paseo. He intentado reiniciar mi teléfono pero el problema persiste.",
                category: "Problema Técnico",
                status: "Resuelto",
                createdAt: "2024-01-10T09:30:00Z",
                updatedAt: "2024-01-11T14:22:00Z",
                response: {
                    agentName: "María González - Soporte Técnico",
                    date: "2024-01-11T14:22:00Z",
                    content: "Hola,\n\nGracias por contactarnos. Hemos identificado el problema que reportas y ya hemos lanzado una actualización (versión 2.1.4) que soluciona este inconveniente.\n\nPor favor:\n1. Ve a la tienda de aplicaciones de tu dispositivo\n2. Busca nuestra aplicación\n3. Descarga la actualización más reciente\n4. Reinicia la aplicación\n\nSi después de actualizar sigues experimentando problemas, no dudes en contactarnos nuevamente.\n\n¡Gracias por tu paciencia!\n\nSaludos,\nMaría González\nEquipo de Soporte Técnico"
                }
            },
            {
                id: 1002,
                userId: userId,
                subject: "Consulta sobre tarifas de paseos nocturnos",
                message: "Me gustaría conocer las tarifas para paseos en horario nocturno (después de las 20:00). Mi perro necesita ejercicio en ese horario por temas de trabajo.",
                category: "Servicios de Paseo",
                status: "Resuelto",
                createdAt: "2024-01-08T16:45:00Z",
                updatedAt: "2024-01-09T10:15:00Z",
                response: {
                    agentName: "Carlos Rodríguez - Atención al Cliente",
                    date: "2024-01-09T10:15:00Z",
                    content: "Estimado cliente,\n\nGracias por tu consulta. Te informo sobre nuestras tarifas de paseos nocturnos:\n\n🌙 PASEOS NOCTURNOS (20:00 - 06:00)\n• Paseo de 30 minutos: $1,800 ARS\n• Paseo de 45 minutos: $2,400 ARS\n• Paseo de 60 minutos: $3,000 ARS\n\nTarifa nocturna incluye:\n✓ Paseador con experiencia en horarios nocturnos\n✓ Equipo de seguridad (linterna, chaleco reflectivo)\n✓ Seguro extendido\n✓ Reporte detallado con fotos\n\nPara programar paseos nocturnos, debes hacerlo con al menos 4 horas de anticipación.\n\n¿Te gustaría que te ayude a programar tu primer paseo nocturno?\n\nSaludos,\nCarlos Rodríguez"
                }
            },
            {
                id: 1003,
                userId: userId,
                subject: "Solicitud de reembolso por cancelación del paseador",
                message: "El paseador canceló mi servicio 30 minutos antes del horario programado sin explicación. Solicito el reembolso completo ya que no pude conseguir otro paseador a tiempo.",
                category: "Facturación",
                status: "En Espera",
                createdAt: "2024-01-15T11:20:00Z",
                updatedAt: "2024-01-15T11:20:00Z"
            },
            {
                id: 1004,
                userId: userId,
                subject: "Problema de acceso a mi cuenta",
                message: "No puedo acceder a mi cuenta desde hace 3 días. Cuando ingreso mi email y contraseña correctos, aparece un mensaje de error que dice 'Credenciales inválidas'.",
                category: "Cuenta de Usuario",
                status: "Cancelada",
                createdAt: "2024-01-05T14:30:00Z",
                updatedAt: "2024-01-06T09:45:00Z",
                cancellationReason: "El cliente logró resolver el problema por su cuenta antes de que pudiéramos asistirle. Confirmó que había estado usando una contraseña incorrecta.",
                response: {
                    agentName: "Ana Martínez - Soporte Técnico",
                    date: "2024-01-06T09:45:00Z",
                    content: "Estimado cliente,\n\nNos complace saber que lograste resolver el problema de acceso a tu cuenta.\n\nComo medida preventiva, te recomendamos:\n• Utilizar el administrador de contraseñas de tu navegador\n• Activar la autenticación de dos factores desde tu perfil\n• Contactarnos inmediatamente si experimentas problemas similares\n\nTicket cerrado por resolución del cliente.\n\nSaludos,\nAna Martínez"
                }
            },
            {
                id: 1005,
                userId: userId,
                subject: "Consulta sobre disponibilidad de paseadores los fines de semana",
                message: "Necesito saber si hay paseadores disponibles los sábados y domingos en la zona de Palermo. También me interesa conocer si las tarifas son diferentes los fines de semana.",
                category: "Servicios de Paseo",
                status: "En Espera",
                createdAt: "2024-01-16T10:15:00Z",
                updatedAt: "2024-01-16T10:15:00Z"
            }
        ];

        return tickets.filter(ticket => ticket.userId === userId);
    },

    async getAllTickets() {
        const allTickets = [];
        const userIds = [1, 2, 3, 4, 5];
        
        for (const userId of userIds) {
            const userTickets = await this.getTicketsByUser(userId);
            allTickets.push(...userTickets);
        }
        
        return allTickets;
    },

    async createTicket(ticketData) {
        
        const newTicket = {
            id: Date.now(), 
            userId: ticketData.userId,
            subject: ticketData.subject,
            message: ticketData.message,
            category: ticketData.category,
            status: "En Espera",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        
        return newTicket;
    },

    async respondToTicket(ticketId, responseData) {
        try {
            
            await new Promise(resolve => setTimeout(resolve, 800));

            if (!ticketId) {
                throw new Error("Ticket ID is required");
            }

            if (!responseData.content || !responseData.content.trim()) {
                throw new Error("Response content is required");
            }

            if (!responseData.agentName || !responseData.agentName.trim()) {
                throw new Error("Agent name is required");
            }

            if (!responseData.status) {
                throw new Error("Status is required");
            }

            const updatedTicket = {
                id: ticketId,
                status: responseData.status,
                updatedAt: new Date().toISOString(),
                response: {
                    agentName: responseData.agentName.trim(),
                    date: new Date().toISOString(),
                    content: responseData.content.trim()
                }
            };

            if (responseData.status === "Cancelada") {
                updatedTicket.cancellationReason = responseData.content.trim();
            }

            console.log("Ticket response simulated successfully:", {
                ticketId,
                status: responseData.status,
                agentName: responseData.agentName,
                contentLength: responseData.content.length,
                timestamp: new Date().toISOString()
            });

            return {
                success: true,
                message: "Response sent successfully",
                ticket: updatedTicket,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error("Error responding to ticket:", error);
            throw new Error(`Failed to respond to ticket: ${error.message}`);
        }
    },

    async getTicketStatistics() {
        try {
            const allTickets = await this.getAllTickets();
            
            const stats = {
                total: allTickets.length,
                pending: allTickets.filter(t => t.status === "En Espera").length,
                resolved: allTickets.filter(t => t.status === "Resuelto").length,
                cancelled: allTickets.filter(t => t.status === "Cancelada").length,
                byCategory: {},
                averageResponseTime: 0
            };

            allTickets.forEach(ticket => {
                const category = ticket.category;
                if (!stats.byCategory[category]) {
                    stats.byCategory[category] = {
                        total: 0,
                        pending: 0,
                        resolved: 0,
                        cancelled: 0
                    };
                }
                stats.byCategory[category].total++;
                stats.byCategory[category][ticket.status.toLowerCase() === "en espera" ? "pending" : 
                                            ticket.status.toLowerCase() === "resuelto" ? "resolved" : "cancelled"]++;
            });

            const resolvedTickets = allTickets.filter(t => t.status === "Resuelto" && t.response);
            if (resolvedTickets.length > 0) {
                const totalResponseTime = resolvedTickets.reduce((acc, ticket) => {
                    const created = new Date(ticket.createdAt);
                    const resolved = new Date(ticket.updatedAt);
                    return acc + (resolved - created) / (1000 * 60 * 60); // en horas
                }, 0);
                stats.averageResponseTime = Math.round(totalResponseTime / resolvedTickets.length);
            }

            return stats;

        } catch (error) {
            console.error("Error getting ticket statistics:", error);
            throw new Error("Failed to get ticket statistics");
        }
    }
};