<!DOCTYPE html>
<html lang="fi">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mikkelin Keilahalli - Admin</title>
    <link rel="shortcut icon" href="../img/logos/ikatyros.png" type="image/x-icon">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/admin.css">

    <!-- pdfobject-2.2.6 -->
    <script type="text/javascript" src="../js/pdfobject-2.6.6/pdfobject.js"></script>

</head>
<body>
   
    <h1>Admin</h1>

    <!-- Kun uutta kilpailuilmoitusta luodaan, siitä luodaan "content/activities" -kansioon uusi kansio, jonka nimi on sen "title":n ensimmäisen sanan ja "title":n kirjainten määrän päivän yhdistelmä, jotka on eroteltu "-". Kansiossa on kaikki siihen liittyvä sisältö. -->
    <!-- id = title first word + day of date -->
    
    <div class="side-panel">
        <div class="anchors">
            <div class="control">
                <h1>=></h1>
            </div>
            <div class="prop">
                <h4>anchor 1</h4>
                <h4>anchor 2</h4>
                <h4>anchor 3</h4>
                <h4>anchor 4</h4>
            </div>
        </div>
        <div class="content">
            <form action="" method="post">
                <h1>Aukioloajat</h1>
    
                <ul>
                    <li>Ma 15:00-20:00</li>
                    <li>Ti 15:00-20:00</li>
                    <li>Ke 15:00-20:00</li>
                    <li>To 15:00-20:00</li>
                    <li>Pe 15:00-20:00</li>
                    <li>La 15:00-20:00</li>
                    <li>Su 15:00-20:00</li>
                </ul>
    
            </form>
    
            <h1>Luo uusi ilmoitus</h1>
            <select name="" id="">
                <option value="">Tapahtumailmoitus</option>
                <option value="">Kilpailuilmoitus</option>
                <option value="">Linkki sivustolle</option>
            </select>

            <form action="" method="post">
                <h1>Luo uusi tapahtumailmoitus</h1>
            </form>

            <form action="" method="post">
                <h1>Luo uusi kilpailuilmoitus</h1>
                <div class="a-title">
                    <input type="text" required placeholder="Ilmoituksen otsikko...">
                    <p>40</p>
                </div>
                <div>
                    <h2>Ilmoituksen ajankohta</h2>
                    
                    <img src="../img/clock-icon.png" alt="Aloitus">
                    <input type="date" name="" id="">
                    
                    <img src="../img/clock-icon.png" alt="Lopetus">
                    <input type="date" name="" id="">
                </div>
                <div>
                    <h2>Ilmoituksen linkit</h2>
                    <input type="text" placeholder="Linkki VaraaVuoro.com ilmoitukseen...">
                    <input type="button" value="+">
                </div>
                <div>
                    <h2>Lisää tiedosto</h2>

                    <div class="pdf-container"></div>
                    
                    <form action="" method="post">
                        <input type="text" placeholder="Lisää ilmoitukseen...">
                        <input type="file" name="Lisää tiedosto" id="">
                        <input type="button" value="+">
                    </form>
                </div>
                <div>
                    <input type="submit">
                </div>
            </form>

            <form action="" method="post">
                <h1>Luo uusi linkki-ilmoitus</h1>
            </form>

        </div>
    </div>

    <script type='text/javascript'>
        
        function pdfEmbed(pdf, target) {
            PDFObject.embed(pdf, target, {
                pdfOpenParams: { 
                    view: 'Fit', 
                    scrollbars: '0', 
                    toolbar: '0', 
                    statusbar: '0', 
                    navpanes: '0'
                },
                width: '400px',
                height: '550px',
                suppressConsole: true,
                forceIframe: true
            });
        }

        pdfEmbed('https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/kesakaadot.pdf', '#pdf1')
        pdfEmbed('../content/uploads/template1.pdf', '#pdf2')

    </script>


</body>
</html>