const uploadFile = ({ event, setMessage }) => {
  const file = event.target.files[0];
  console.log("got files to read");

  if (!file) {
    return;
  }
  if (file.size > 10000000) {
    alert("File should be smaller than 1MB");
    return;
  }

  const reader = new FileReader();
  const onLoadReader = () => {
    console.log("in onload funct");
    const dataUrl = reader.result;
    // const output = document.getElementById("output");
    // output.src = dataUrl;
    console.log(dataUrl);
    setMessage(dataUrl);
  };
  reader.onload = onLoadReader;

  reader.readAsDataURL(file);
};

module.exports = {
  uploadFile,
};
