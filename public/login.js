

document.addEventListener('DOMContentLoaded', async () => {
    const logon = document.getElementById('logon')
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const pwreset = document.getElementById('pwreset')
    const email1 = document.getElementById('email1')
    const sendVerify = document.getElementById('sendVerify')
    const email2 = document.getElementById('email2')
    const messages = document.getElementById('messages')
    try {
        logon.addEventListener('click', async () => {
            response = await fetch('/api/v1/users/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( {
                        email: email.value,
                        password: password.value
                    })
                })
            data = await response.json()
            if (response.status === 200) {
                sessionStorage.setItem('token', data.token)
                sessionStorage.setItem('tokenExpiration', data.expires)
                sessionStorage.setItem('email', email.value)
                window.location.href = '/index.html'
            } else {
                messages.innerText = data.message
            }
        })
        sendVerify.addEventListener('click', async () => {
            response = await fetch('/api/v1/users/sendEmailValidatePrompt',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email2.value,
                    })
                })
            data = await response.json()
            messages.innerText = data.message
        })
        pwreset.addEventListener('click', async () => {
            response = await fetch('/api/v1/users/requestPasswordResetPrompt',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email1.value,
                    })
                })
            data = await response.json()
            messages.innerText = data.message
        })
    } catch (error) {
        console.log(error)
        alert(e.name + ": " + error.message)
    }
})