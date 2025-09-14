export const JoinToUsAPI = {
    registrations: [
        {
            id: 'REG-1704067200000-123',
            userId: 2, 
            fullName: 'Carlos Rodriguez',
            phone: '1134567890',
            dni: '12345678',
            city: 'Buenos Aires',
            province: 'Buenos Aires',
            images: {
                dniFront: {
                    filename: 'dniFront_1704067200000_dni_front.jpg',
                    originalName: 'dni_front.jpg',
                    size: 2048576,
                    type: 'image/jpeg',
                    uploadedAt: '2024-01-01T10:00:00Z',
                    url: 'https://storage.example.com/registrations/dniFront_1704067200000_dni_front.jpg'
                },
                dniBack: {
                    filename: 'dniBack_1704067200000_dni_back.jpg',
                    originalName: 'dni_back.jpg',
                    size: 2156789,
                    type: 'image/jpeg',
                    uploadedAt: '2024-01-01T10:00:00Z',
                    url: 'https://storage.example.com/registrations/dniBack_1704067200000_dni_back.jpg'
                },
                selfieWithDni: {
                    filename: 'selfieWithDni_1704067200000_selfie.jpg',
                    originalName: 'selfie.jpg',
                    size: 1876543,
                    type: 'image/jpeg',
                    uploadedAt: '2024-01-01T10:00:00Z',
                    url: 'https://storage.example.com/registrations/selfieWithDni_1704067200000_selfie.jpg'
                }
            },
            status: 'rejected',
            submittedAt: '2024-01-01T10:00:00Z',
            reviewedAt: '2024-01-03T14:30:00Z',
            reviewedBy: 'admin-001',
            adminNotes: 'La calidad de las imágenes del DNI no es suficiente para verificar la información. Por favor, toma fotos más claras con buena iluminación.',
            applicationScore: null
        },
        {
            id: 'REG-1704153600000-456',
            userId: 6,
            fullName: 'Ana Martinez',
            phone: '1145678901',
            dni: '23456789',
            city: 'Córdoba',
            province: 'Córdoba',
            images: {
                dniFront: {
                    filename: 'dniFront_1704153600000_dni_front.jpg',
                    originalName: 'dni_front.jpg',
                    size: 1945621,
                    type: 'image/jpeg',
                    uploadedAt: '2024-01-02T08:00:00Z',
                    url: 'https://storage.example.com/registrations/dniFront_1704153600000_dni_front.jpg'
                },
                dniBack: {
                    filename: 'dniBack_1704153600000_dni_back.jpg',
                    originalName: 'dni_back.jpg',
                    size: 2023456,
                    type: 'image/jpeg',
                    uploadedAt: '2024-01-02T08:00:00Z',
                    url: 'https://storage.example.com/registrations/dniBack_1704153600000_dni_back.jpg'
                },
                selfieWithDni: {
                    filename: 'selfieWithDni_1704153600000_selfie.jpg',
                    originalName: 'selfie.jpg',
                    size: 1756789,
                    type: 'image/jpeg',
                    uploadedAt: '2024-01-02T08:00:00Z',
                    url: 'https://storage.example.com/registrations/selfieWithDni_1704153600000_selfie.jpg'
                }
            },
            status: 'approved',
            submittedAt: '2024-01-02T08:00:00Z',
            reviewedAt: '2024-01-04T16:45:00Z',
            reviewedBy: 'admin-002',
            adminNotes: 'Aplicación aprobada. Documentación completa y verificada.',
            applicationScore: 95
        }
    ],

    async createRegistration(registration) {
        const existingApplication = this.registrations.find(r => r.userId === registration.userId);
        if (existingApplication && ['pending', 'under_review', 'approved'].includes(existingApplication.status)) {
            throw new Error('Ya tienes una solicitud activa. Espera a que sea procesada antes de enviar una nueva.');
        }

        if (existingApplication && existingApplication.status === 'rejected') {
            const index = this.registrations.findIndex(r => r.id === existingApplication.id);
            this.registrations.splice(index, 1);
        }
        
        // Simular delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        this.registrations.push(registration);
        return registration;
    },

    async getAllRegistrations() {
        await new Promise(resolve => setTimeout(resolve, 300));
        return [...this.registrations];
    },

    async getRegistrationById(registrationId) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const registration = this.registrations.find(r => r.id === registrationId);
        return registration || null;
    },

    async updateRegistration(registrationId, updateData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const registrationIndex = this.registrations.findIndex(r => r.id === registrationId);
        
        if (registrationIndex === -1) {
            throw new Error('Registration not found');
        }

        this.registrations[registrationIndex] = {
            ...this.registrations[registrationIndex],
            ...updateData
        };

        return this.registrations[registrationIndex];
    },

    async deleteRegistration(registrationId) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const registrationIndex = this.registrations.findIndex(r => r.id === registrationId);
        
        if (registrationIndex === -1) {
            throw new Error('Registration not found');
        }

        const deletedRegistration = this.registrations.splice(registrationIndex, 1)[0];
        return deletedRegistration;
    },

    async getRegistrationsByStatus(status) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        return this.registrations.filter(r => r.status === status);
    },

    async getApplicationByUserId(userId) {
        await new Promise(resolve => setTimeout(resolve, 250));
        
        const userIdInt = parseInt(userId);
        const application = this.registrations.find(r => r.userId === userIdInt);
        
        if (!application) {
            throw new Error('No application found for this user');
        }

        return application;
    },

    async getRegistrationStatistics() {
        await new Promise(resolve => setTimeout(resolve, 150));
        
        const stats = {
            total: this.registrations.length,
            pending: this.registrations.filter(r => r.status === 'pending').length,
            under_review: this.registrations.filter(r => r.status === 'under_review').length,
            approved: this.registrations.filter(r => r.status === 'approved').length,
            rejected: this.registrations.filter(r => r.status === 'rejected').length
        };

        return stats;
    },

    async promoteUserToWalker(userId) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        console.log(`Usuario ${userId} promovido a walker`);
        
        return {
            success: true,
            message: 'Usuario promovido exitosamente',
            newRole: 'walker'
        };
    }
};