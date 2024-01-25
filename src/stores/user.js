import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from "../firebaseConfig";
import router from "../router";

export const useUserStore = defineStore('user', {
    state: () => ({
        userData: null,
        loadingUser: false,
        loadingSession: false
    }),
    getters: {
        minuscula(state) {
            return state.userData.toLowerCase();
        }
    },
    actions: {
        async registerUser(email, password) {
            try {
                this.loadingUser = true;
                const { user } = await createUserWithEmailAndPassword(auth, email, password)
                this.userData = {email: user.email, uid: user.uid}
                router.push('/')
            } catch (error) {
                console.log(error);
            } finally {
                this.loadingUser = false;
            }
        },

        async loginUser(email, password) {
            try {
                this.loadingUser = true;
                const { user } = await signInWithEmailAndPassword(auth, email, password)
                this.userData = {email: user.email, uid: user.uid}
                router.push('/')
            } catch (error) {
                console.log(error);
            } finally {
                this.loadingUser = false;
            }
        },

        async logoutUser() {
            try {
                await signOut(auth)
                this.userData = {}
                router.push('/login')
            } catch (error) {
                console.log(error);
            }
        },

        currentUser() {
            let unsubcribe;
            return new Promise((resolve, reject) => {
                unsubcribe = onAuthStateChanged(auth, (user) => {
                    if(user) {
                        this.userData = {
                            email: user.email,
                            uid: user.uid
                        }
                    } else {
                        this.userData = null
                    }
                    resolve(user)
                })
            }).then((user) => {
                unsubcribe();
                return user;
            })
        } 
    }
})