const props = {
  name: 'Abby',
  chat: 'the last of us. Part II',
  getChat() {
    this._privateMethod();
  },
  _privateMethod() {
    console.log(this._privateProp);
  },
  __privateMethodToo() {},
  _privateProp: 'Нельзя получить просто так',
};

const proxyProps = new Proxy(props, {
  get(o, name) {
    if (name.search('_') !== -1) {
      // console.log('Нет прав');
      // return false;
    }

    return o[name];
    // return o[name];
  },
  set(o, name, newValue) {
    if (name.search('_') !== -1) {
      throw new Error('Нет прав');
    }

    o[name] = newValue;

    return true;
  },
  deleteProperty(o, name) {
    if (name.search('_') !== -1) {
      throw new Error('Нет прав');
    }

    return true;
  },
});

// proxyProps.getChat();
// delete proxyProps.chat;

// proxyProps.newProp = 2;
// console.log(proxyProps.newProp);

try {
	proxyProps._newPrivateProp = 'Super game';
} catch (error) {
	console.log(error);
}

console.log(props);

// try {
// 	delete proxyProps._privateProp;
// } catch (error) {
// 	console.log(error); // Error: Нет прав
// }

/*
	* Вывод в консоль следующий:
Нельзя получить просто так
2
Error: Нет прав
Error: Нет прав
*/
