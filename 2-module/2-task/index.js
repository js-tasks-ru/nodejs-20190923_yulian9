const LineSplitStream = require('./LineSplitStream');
const os = require('os');

const lines = new LineSplitStream({
  encoding: 'utf-8',
});

function onData(line) {
  console.log(line);
}

lines.on('data', onData);

lines.write(`первая строка${os.EOL}вторая строка${os.EOL}третья строка`);

lines.end();
/*
# Стрим, разбивающий текст на строки

При работе с большими объемами текстовых данных при помощи стримов очень часто возникает
задача разбить данные по какому-то ключу или признаку. Например, при обработке большого CSV
файла необходимо разбить данные по символу переноса строки, для того, чтобы потоково
обработать каждый элемент файла.

В текущей задаче вам потребуется написать `LineSplitStream` - стрим, который принимает
текстовые данные, а отдает их же, но уже построчно, например:

В результате выполнения кода выше функция `onData` будет вызвана три раза.

Символ переноса строки отличаются для разных операционных систем, в Windows - это `\r\n`, в
Mac и Linux - `\n`. Для того, чтобы наш код работал корректно во всех операционных системах
символ для той ОС, на которой запущена программа.
можно воспользоваться свойством `os.EOL` модуля `os`, которое будет содержать корректный
*/
