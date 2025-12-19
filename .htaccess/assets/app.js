// Ambil data dari backend
fetch('/api.php')
  .then(res => res.json())
  .then(d => {
    // Render konten di div #app
    document.getElementById('app').innerHTML = `
      <h1>${d.title}</h1>
      <p>${d.content}</p>
    `;
  })
  .catch(err => {
    // Kalau error (misal blocked) tampil pesan
    document.getElementById('app').innerHTML = `<p>Access denied</p>`;
    console.error(err);
  });
