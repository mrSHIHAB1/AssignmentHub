import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h6 className="footer-title text-primary opacity-100 text-lg mb-4">AssignmentHub</h6>
            <p className="text-sm opacity-70 mb-4">
              Empowering students to learn and grow together through collaborative assignment sharing.
            </p>
            <div className="flex gap-4">
              <a href="#" className="btn btn-ghost btn-sm btn-circle text-xl hover:text-primary"><FaFacebook /></a>
              <a href="#" className="btn btn-ghost btn-sm btn-circle text-xl hover:text-primary"><FaTwitter /></a>
              <a href="#" className="btn btn-ghost btn-sm btn-circle text-xl hover:text-primary"><FaInstagram /></a>
              <a href="#" className="btn btn-ghost btn-sm btn-circle text-xl hover:text-primary"><FaLinkedin /></a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h6 className="footer-title opacity-100 text-lg mb-2">Company</h6>
            <a className="link link-hover hover:text-primary transition-colors">About us</a>
            <a className="link link-hover hover:text-primary transition-colors">Contact</a>
            <a className="link link-hover hover:text-primary transition-colors">Jobs</a>
            <a className="link link-hover hover:text-primary transition-colors">Press kit</a>
          </div>

          <div className="flex flex-col gap-2">
            <h6 className="footer-title opacity-100 text-lg mb-2">Legal</h6>
            <a className="link link-hover hover:text-primary transition-colors">Terms of use</a>
            <a className="link link-hover hover:text-primary transition-colors">Privacy policy</a>
            <a className="link link-hover hover:text-primary transition-colors">Cookie policy</a>
          </div>

          <div>
            <h6 className="footer-title opacity-100 text-lg mb-4">Newsletter</h6>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Stay updated with our latest news</span>
              </label>
              <div className="join">
                <input type="text" placeholder="username@site.com" className="input input-bordered join-item w-full focus:outline-none focus:border-primary" />
                <button className="btn btn-primary join-item text-white">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-base-300 pt-8 text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} AssignmentHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;