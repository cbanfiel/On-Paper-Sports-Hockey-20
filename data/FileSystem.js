import * as FileSystem from 'expo-file-system';
export const FILES ={
    FAVORITES: 'favorites.json',
    SETTINGS: 'settings.json'
}

export const saveToFileSystem = async(file, data) => {
    let jsonData = JSON.stringify(data);
    const path = `${FileSystem.documentDirectory}${file}`;
    FileSystem.writeAsStringAsync(path, jsonData)
    .catch(err => console.log(err));
}

export const loadFromFileSystem = async (file, _callback) => {
    FileSystem.readAsStringAsync(FileSystem.documentDirectory + file).then(res => {
        let obj = JSON.parse(res);
        _callback(obj);
    }).catch(err => {
        console.log(err);
        switch (file) {
            case FILES.SETTINGS:
                saveToFileSystem(file, INITIAL_SETTINGS)
                console.log('created new settings file');
                break;
            default:
                break;
        }
    })
}

export const deleteFile = async (file) => {
    const path = `${FileSystem.documentDirectory}${file}`;
    return await FileSystem.deleteAsync(path)
}

export const INITIAL_SETTINGS = {
    email: "",
    password: "",
    reviewRequestShown : false
}