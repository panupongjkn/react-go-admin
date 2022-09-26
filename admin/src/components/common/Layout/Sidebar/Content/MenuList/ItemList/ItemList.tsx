import Item from "./Item";
import ItemWithCollapse from "./ItemWithCollapse";

interface IItemList {
  icon: React.ReactNode;
  label: string;
  href?: string;
  subMenu?: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }[];
}

const ItemList: React.FC<IItemList> = ({ icon, label, href, subMenu }) => {
  if (subMenu) {
    return <ItemWithCollapse icon={icon} label={label} subMenu={subMenu} />;
  } else {
    return <Item icon={icon} label={label} href={href as string} />;
  }
};

export default ItemList;
