import Icons from "../components/Icons";

const Footer = () => {
  return (
    <footer className="container m-auto pt-32 pb-20 h-footerHeight">
      <div className="flex gap-x-2.5 justify-center mb-4">
        <Icons.Facebook className="cursor-pointer fill-neutral-400 hover:fill-neutral-500 transition-colors" />
        <Icons.Instagram className="cursor-pointer fill-neutral-400 hover:fill-neutral-500 transition-colors" />
      </div>
      <div className="text-center text-sm text-neutral-400">Copyright &copy; 2023 Jinny Huang</div>
    </footer>
  );
};

export default Footer;
