const services = {};

function importAll(r) {
    r.keys().forEach((key) => {
        services[key] = r(key);
    });
}

importAll(require.context('./', true, /\/services\/(.*?)\/index\.js$/));

export default services;
