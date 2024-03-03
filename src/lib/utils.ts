export const getCookie = (name: string) => {
    // Separa todas las cookies presentes en el documento
    let cookies = document.cookie.split(';');

    // Itera sobre cada cookie para buscar el nombre proporcionado
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        // Si la cookie comienza con el nombre buscado, devuelve su valor
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }

    // Si no se encuentra la cookie, devuelve null
    return null;
}


// Definición de la función para sobreescribir el valor de una cookie
export function overwriteCookie(name: string, newValue: string, expirationDays: number = 30): void {
    // Obtener todas las cookies actuales
    const cookies = document.cookie.split(';');

    // Iterar sobre cada cookie para buscar la que queremos sobreescribir
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();

        // Si la cookie actual coincide con el nombre proporcionado
        if (cookie.startsWith(name + '=')) {
            // Conservar el valor de la cookie excepto el nombre
            const cookieParts = cookie.split('=');
            const oldName = cookieParts.shift(); // Elimina el nombre antiguo
            const updatedCookie = [oldName, encodeURIComponent(newValue), ...cookieParts].join('=');

            // Establecer la cookie actualizada con la misma fecha de expiración
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
            document.cookie = `${updatedCookie}; expires=${expirationDate.toUTCString()}; path=/`;

            // Salir del bucle ya que ya hemos actualizado la cookie
            return;
        }
    }

    // Si la cookie no existe, crear una nueva cookie con el valor proporcionado
    document.cookie = `${name}=${encodeURIComponent(newValue)}; expires=${(new Date(Date.now() + (expirationDays * 24 * 60 * 60 * 1000))).toUTCString()}; path=/`;
}

