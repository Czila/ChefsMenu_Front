import './GenererunQRCode.css'
import logo from '../../assets/logo.png'


function GenererunQRCode(){

return(
    <div id="genererunQRCode">
        <div>
            <img src={logo} alt="Logo" className='logo' />
        </div>
        <div className='GUQRCForm'>
            <label className='GUQRCtitre'><b>Générez les QR Codes de votre restaurant</b></label>
        </div>
        <div className='GUQRCdiv'>
        <Link to="/qrcode">Mes QR Codes</Link>
        </div>
</div>



)
}

export default GenererunQRCode