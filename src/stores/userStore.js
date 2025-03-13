import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        name: localStorage.getItem('user_name') || '',
        email: localStorage.getItem('user_email') || '',
        role: localStorage.getItem('user_role') || '',
        token: localStorage.getItem('user_token') || ''
    }),
    actions: {
        setUser(name, email, role, token) {
            this.name = name;
            this.email = email;
            this.role= role;
            this.token = token;

            localStorage.setItem('user_name', name);
            localStorage.setItem('user_email', email);
            localStorage.setItem('user_role', role);
            localStorage.setItem('user_token', token);
        },
        logout() {
            this.name = '';
            this.email = '';
            this.role='';
            this.token = '';

            localStorage.removeItem('user_name');
            localStorage.removeItem('user_email');
            localStorage.removeItem('user_role');
            localStorage.removeItem('user_token');
        }
    }
})
