import { useState } from "react";
import CryptoJS from "crypto-js";
import InputFile from "./components/InputFile";
import TextArea from "./components/TextArea";
import Button from "./components/Button";
import Input from "./components/Input";

function App() {

  // Se inicializan los estados
  const [file, setFile] = useState({
    data: null,
    blob: null,
    name: "Ningún archivo seleccionado",
    nameDownload: "",
    content: "",
  });
  const [fields, setFields] = useState({
    key: "",
    message: "",
    encrypted: "",
    decrypted: "",
    valid: null,
  });

  // Se inicializan las expresiones regulares
  const expresiones = {
    key: /^[a-zA-Z0-9]{8}$/, // Letras, numeros
  };
  
  // Se valida la entrada de datos
  const validate = () => {
    if (fields.message === '' && file.data === null) {
      alert("Ingesa un mensaje o selecciona un archivo");
    }
    if (fields.valid === "true") {
      return true;
    } 
    if (fields.valid === "false" || fields.valid === null) {
      alert("La llave debe tener 8 caracteres");
      return false;
    }
  };

  // Función para leer el archivo
  const onChangeField = (e) => {
    if (e.target.files[0] !== undefined) {
      const getFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(getFile);
      reader.onload = (e) => {
        console.log(getFile, e.target.result);
        setFile({
          data: getFile,
          blob: null,
          name: getFile.name,
          content: e.target.result,
        });
      };
    }
  };

  // Función para encriptar el mensaje
  const encrypt = () => {
    
    // Se valida que se haya ingresado algun dato
    if (validate()) {
      console.log("Encriptando mensaje");
      // Se valida que el mensaje no esté vacío
      if (fields.message !== '') {
        const encrypted = CryptoJS.DES.encrypt(fields.message, fields.key).toString();
        
        // Se asigna el mensaje encriptado al estado
        setFields({ ...fields, encrypted, decrypted: "" });

        //Se asigna el mensaje desencriptado al archivo para descargarlo
        setFile({ 
          ...file, 
          data: null,
          blob: new Blob([encrypted], { type: "text/plain" }),
          nameDownload: `Message_encrypted_${Math.random()}.txt`,
          content: encrypted,
        });
      }

      // Se valida que el archivo no esté vacío
      if (file.data !== null && fields.message === '') {
        const encrypted = CryptoJS.DES.encrypt(file.content, fields.key).toString();

        // Se asigna el mensaje encriptado al estado
        setFields({ ...fields, encrypted, decrypted: "" });

        //Se asigna el mensaje desencriptado al archivo para descargarlo
        setFile({ 
          ...file, 
          blob: new Blob([encrypted], { type: "text/plain" }),
          nameDownload: `${file.name}_encrypted_${Math.random()}.txt`,
          content: encrypted,
        });
      }
    }
    console.log(fields, file);
  };

  // Función para desencriptar el mensaje
  const decrypt = () => {
    
    // Se valida que se haya ingresado algun dato
    if (validate()) { 
      console.log("Desencriptando mensaje");

    // Se valida que el mensaje no esté vacío
      if (fields.message !== '') {
        const decrypted = CryptoJS.DES.decrypt(fields.message, fields.key).toString( CryptoJS.enc.Utf8 );
        // Se asigna el mensaje desencriptado al estado
        setFields({ ...fields, decrypted, encrypted: "" });

        // Se asigna el mensaje desencriptado al archivo para descargarlo
        setFile({ 
          ...file,
          data: null,
          blob: new Blob([decrypted], { type: "text/plain" }),
          nameDownload: `Message_decrypted_${new Date().toDateString()}.txt`,
          content: decrypted,
        });
      }

      // Se valida que el archivo no esté vacío
      if (file.data !== null && fields.message === '') {
        const decrypted = CryptoJS.DES.decrypt(file.content, fields.key).toString( CryptoJS.enc.Utf8 );
        
        // Se asigna el mensaje desencriptado al estad
        setFields({ ...fields, decrypted, encrypted: "" });

        // Se asigna el mensaje desencriptado al archivo para descargarlo
        setFile({ 
          ...file,
          blob: new Blob([decrypted], { type: "text/plain" }),
          nameDownload: `${file.name}_decrypted_${new Date().toDateString()}.txt`,
          content: decrypted,
        });
      }
      console.log(fields, file);
    }
  };

  // Función para descargar el archivo
  const downloadFile = () => {
    console.log("Descargando archivo");
    console.log(file);

    const url = URL.createObjectURL(file.blob);
    const link = document.createElement("a");
    link.download = file.nameDownload;
    link.href = url;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center overflow-hidden ">
      <div className="absolute inset-0 w-full h-full m-auto">
        <img
          id="background"
          src="bg2.webp"
          className="h-screen w-full object-cover transition duration-300"
          alt=""
        />
      </div>

      <h2 className="text-3xl font-bold text-center relative group w-full m-5">
        DES
      </h2>

      <InputFile src="file.png" onChange={onChangeField} text={file.name} />

      <div className="m-auto px-6 sm:px-0 sm:w-8/12 md:w-7/12 lg:w-6/12 xl:w-6/12">
        <div className="relative group w-full h-40 flex flex-col gap-3 justify-center items-center">
          <Input
            state={fields}
            setState={setFields}
            regEx={expresiones.key}
            onChange={(e) => setFields({...fields, key:e.target.value})}
            name="key"
            label="Llave"
            placeholder="Ingrese una clave de 8 caracteres"
            msgError="La clave debe tener 8 caracteres alfanuméricos y sin espacios"
          />
          <div className="w-full flex items-center justify-items-center gap-5">
            <TextArea
              state={fields}
              setState={setFields}
              placeholder="Ingrese su mensaje o dejelo en blanco para cifrar un archivo"
              name="message"
              label="Mensaje"
            />
            {fields.encrypted !== "" && (
              <TextArea
                value={fields.encrypted}
                name="decrypted"
                label="Mensaje descifrado"
                disabled={true}
                
              />
            ) || fields.decrypted !== "" && (
              <TextArea
                value={fields.decrypted}
                name="encrypted"
                label="Mensaje cifrado"
                disabled={true}
              />
            )}
          </div>

          <div className="m-2">
            <Button
              children="Encrypt"
              href=""
              px="px-6"
              py="py-2"
              bg="bg-teal-300"
              hoverBg="hover:bg-teal-400"
              txtColor="text-white"
              hoverColor="hover:text-white"
              border="border-2"
              borderColor="border-teal-300"
              hoverBorderColor="hover:border-teal-400"
              sahdow="shadow-md"
              hoverShadow="hover:shadow-lg"
              rounded="rounded-md"
              hoverTransition="hover:transition duration-300 ease-in-out"
              onclick={encrypt}
              disabled={false}
              type="button"
            />

            <Button
              children="Decrypt"
              href=""
              px="px-6"
              py="py-2"
              bg="bg-teal-300"
              hoverBg="hover:bg-teal-400"
              txtColor="text-white"
              hoverColor="hover:text-white"
              border="border-2"
              borderColor="border-teal-300"
              hoverBorderColor="hover:border-teal-400"
              sahdow="shadow-md"
              hoverShadow="hover:shadow-lg"
              rounded="rounded-md"
              hoverTransition="hover:transition duration-300 ease-in-out"
              onclick={decrypt}
              disabled={false}
              type="button"
            />

            <Button
              children="Download"
              href=""
              px="px-6"
              py="py-2"
              bg="bg-red-300"
              hoverBg="hover:bg-red-400"
              txtColor="text-white"
              hoverColor="hover:text-white"
              border="border-2"
              borderColor="border-red-300"
              hoverBorderColor="hover:border-red-400"
              sahdow="shadow-md"
              hoverShadow="hover:shadow-lg"
              rounded="rounded-md"
              hoverTransition="hover:transition duration-300 ease-in-out"
              onclick={() => downloadFile()}
              disabled={false}
              type="button"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
