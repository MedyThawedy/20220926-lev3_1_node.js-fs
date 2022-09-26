import fs from 'fs';
// Erstelle einen Unterordner innerhalb deines Projektordners. In diesem Ordner soll die Datei angelegt werden.

let content = 'File was created';

/* Old  
fs.writeFile('./assets/anotherfile.txt', content, err => {
    if (err) {
        console.error(err);
    }
});
*/

/** New with promises */
fs.promises.open('./assets/anotherfile.txt', 'a')
    .then(fd => fs.promises.writeFile(fd, content))
    .catch(err => console.log(err))

//Schreibe eine Funktion, die einen Parameter annimmt.
/* Old
const myFunction = (filePath, content) => {
    // Nun prüfe: Wurde die Datei bereits erstellt? Ist das NICHT der Fall, erstelle sie mithilfe des File Systems von Node.js.    
    /*
    In diese Datei soll der Inhalt des Parameters geschrieben werden. Denk dran, diesen auch mit zu liefern, wenn du die Funktion aufrufst. 
    Existiert die Datei bereits? Dann füge der bereits bestehenden Datei den Inhalt des Parameters in einer neuen Zeile hinzu.

    if (fs.existsSync(filePath)) {
        console.log('File exists! We will append the content!');
        fs.appendFile(filePath, (('\n' + '\n') + content), (err) => {
            if (err) console.log(err);
        });
    } else {
        console.log('File doesn t exist! We will create it and write the content!')
        fs.writeFile(filePath, content, err => {
            if (err) {
                console.error(err);
            }
        });
    }
}*/

const fnWriteInFileWithPromise = (filePath, content) => {

    return new Promise((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            console.log('File exists! We will append the content!');
            fs.appendFile(filePath, (('\n' + '\n') + content), (err) => {
                if (err) {
                    console.log('1. Error appending was not possible', err);
                    reject(err);
                } else {
                    console.log('2. Appending was possible! ');
                    resolve(filePath, content);
                }
            });
        } else {
            console.log('File doesn t exist! We will create it and write the content!')
            fs.writeFile(filePath, content, err => {
                if (err) {
                    console.log('3. Error file creation was not possible', err);
                    reject(err);
                }
                else {
                    console.log('4. File creation and text appending was possible! ');
                    resolve(filePath, content);
                }
            });
        }
    })
}

/*
myFunction('./assets/myfile.txt', 'Test 1');
myFunction('./assets/myfile.txt', 'Test 2');
myFunction('./assets/testfile.txt', 'New File was created!');
*/

fnWriteInFileWithPromise('./assets/myfile.txt', 'Test 1');
fnWriteInFileWithPromise('./assets/myfile.txt', 'Test 2');
fnWriteInFileWithPromise('./assets/testfile.txt', 'New File was created!');