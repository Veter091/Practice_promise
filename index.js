// Задача: Сумма с задержкой 
// Требование: реализовать функцию delayedAdd(a, b, delay, callback), которая через delay мс вызывает колбэк с суммой

// function delayedAdd(a, b, delay, callback) {
// }

delayedAdd(2, 3, 50, (err, sum) => {
  if (err) return console.error(err);
  console.log('sum =', sum); // 5
});


// Решение
function delayedAdd(a, b, delay, callback) {

    setTimeout(() => {
        const sum = a + b
        callback(null, sum)

    }, delay)
}




// Задача: Обработка ошибок в колбэках
// Требование: функция readConfig(path, callback) должна возвращать ошибку, если путь не строка, или объект {path} через задержку.

readConfig('/etc/app.json', (err, cfg) => console.log(err ? err.message : cfg)); // {path: '/etc/app.json }
readConfig(42, (err) => console.log(err)); // Error


function readConfig(path, callback) {

    setTimeout(() => {
        if (typeof path !== 'string') {
            callback(new Error('Необходимо передать строку'))
            return 
        }

        callback(null, {path})

    }, 0)
}



// Задача: Промисифицированная сумма
// Требование: реализовать addAsync(a, b, delay), возвращающий промис с суммой.

// function addAsync(a, b, delay = 50) {}

function addAsync(a, b, delay = 50) {
    return new Promise((resolve) => {

        setTimeout(() => {
            resolve(a + b)
        }, delay)
    })
}

addAsync(10, 3).then(x => console.log(x)); // 5




// Задача: Функция wait
// Написать функцию wait, которая позволит делать задержку вызова через await на переданное количество миллисекунд

code()
async function code() {
	await wait(1000);
	console.log('success') // Выведется через 1000 мс
}


 function wait(delay) {
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
 }




 // Задача: Получить комментарий первого поста
//  Требование: ниже есть функции getUser, getPosts, getFirstPostComments, они возвращают промисы. Нужно соединить их цепочкой и получить комментарии первого поста.

const delay = ms => new Promise(r => setTimeout(r, ms));

const getUser = id => delay(20).then(() => ({ id, name: 'Alice' }));
const getPosts = uid => delay(20).then(() => [{ id: 1, userId: uid }, { id: 2, userId: uid }]);
const getFirstPostComments = pid => delay(20).then(() => [{ id: 11, postId: pid }]);

// Написать код, чтобы получить комментарий первого поста
getUser(25)
    .then(user => getPosts(user.id))
    .then(post => getFirstPostComments(post[0].id))
    .then(comment => console.log(comment))







// Задача: implement `Promise.allSettled()`
// Реализовать функцию allSettled(promises), не используя сам Promise.allSettled()

// @param {Array<any>} promises - notice that input might contains non-promises
// @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}

function allSettled(promises) {

    return Promise.all(
        promises.map(elem => {
            return Promise.resolve(elem)
                .then(value => {
                return {status: 'fulfilled', value}
            })
                .catch(reason => {
                    return {status: 'rejected', reason}
                })
        })
    )

    
}

console.log(allSettled([Promise.resolve(1), Promise.reject('X'), Promise.resolve(7), Promise.reject('Ошибка'),]))















// Доп. задачи на Promise


// Создайте Promise, который разрешается через 1 секунду со строкой "готово". Выведите результат через .then.
const promise2 = new Promise(resolve => {
    setTimeout(() => {
        resolve('Готово')
    }, 1000)
})

promise2.then(value => console.log(value))

// Решение через delay

const delay1 = ms => new Promise(resolve => setTimeout(resolve, ms))

delay1(1000)
    .then(() => 'Готово')
    .then(value => console.log(value))





// Создайте Promise, который отклоняется через 500 мс с Error("Что-то упало"). Обработайте через .catch.

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('Что-то упало'))
    }, 500)
})

promise3.catch(err => console.log(err.message))

// Решение через delay

const delay3 = ms => new Promise((resolve, reject) => setTimeout(() => {
    reject(new Error('Что-то упало'))
}, ms))

delay3(500)
    .catch(err => console.log(err.message))
    




// Создайте Promise, который с вероятностью 50% разрешается значением "успех" или отклоняется с Error("провал"). Обработайте оба случая.
const promise4 = new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
        resolve('Успех')
    }
    else {
        reject(new Error('Провал'))
    }
})

promise4
    .then(value => console.log(value))
    .catch(err => console.log(err.message))







// Создайте два Promise через Promise.resolve и Promise.reject. Выведите оба результата.

Promise.resolve(1)
    .then(value => console.log(value))

Promise.reject(2)
    .catch(err => console.log(err))





// Напишите функцию checkNumber(n), которая возвращает Promise:
// Если n > 0 → resolve с "положительное"
// Если n === 0 → resolve с "ноль"
// Если n < 0 → reject с Error("отрицательное")

    function checkNumber(n) {

        return new Promise((resolve, reject) => {
            if (n > 0) {
                resolve('Положительное')
            }
            else if (n === 0) {
                resolve('Ноль')
            }
            else {
                reject(new Error('Отрицательное'))
            }
        })
    }

    checkNumber(0)
        .then(value => console.log(value))
        .catch(err => console.log(err.message))






// Начните с Promise.resolve(5), добавьте +1, потом *2, выведите результат.
Promise.resolve(5)
    .then(value => value + 1)
    .then(value => value * 2)
    .then(value => {
        console.log(value)
        return value
    })




// В .then верните новый Promise (через Promise.resolve). Убедитесь, что цепочка работает.
Promise.resolve()
    .then(() => new Promise(resolve => resolve(1)))
    .then(value => console.log(value))





// Создайте цепочку: resolve → then → throw → catch. Выведите сообщение об ошибке.
Promise.resolve(35)
    .then(value => value + 1)
    .then(value => {
        throw new Error('Ошибка')
    })
    .catch(err => console.log(err.message))





// Создайте Promise с задержкой. Добавьте .finally(() => console.log('завершено')). Проверьте, что finally срабатывает и при успехе, и при ошибке.
const delay4 = ms => new Promise((resolve) => setTimeout(() => resolve(10), ms))

delay4(1000)
    .then(value => {throw new Error('Ошибка!')})
    .catch(err => console.log(err.message))
    .finally(() => console.log('Завершено'))







//Напишите функцию waitAndReturn(ms, value) — возвращает Promise, который разрешается значением value через ms мс.

function waitAndReturn(ms, value) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value)
        }, ms)
    })
}

waitAndReturn(1000, 57)
    .then(value => console.log(value))





// Есть функция readData(callback), которая вызывает callback(err, data). Напишите readDataPromise(), возвращающую Promise.

function readDataPromise() {
    return new Promise((resolve, reject) => {
        readData((err, data) => {

            if (err) {
                reject(err)
            }

            resolve(data)
        })
    })
}





// Есть функции fetchUser(), fetchPosts(), fetchComments() — каждая возвращает Promise с задержкой. Запустите их параллельно и дождитесь всех.

const delay5 = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms))

const fetchUser = () => delay5(1000, {id: 1, name: 'Богдан'})
const fetchPosts = () => delay5(2000, [{id: 1, title: 'Пост'}])
const fetchComments = () => delay5(3000, [{id: 1, text: 'Коммент'}])


Promise.all([fetchUser(), fetchPosts(), fetchComments()])
    .then(([user, post, comment]) => {
        console.log(user)
        console.log(post)
        console.log(comment)
    })
    .catch(err => console.error(err))




