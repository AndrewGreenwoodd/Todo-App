import styles from '../UI/Button.module.css';
import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: (event: React.FormEvent) => void;
  className: string;
  type?: "button" | "submit" | "reset";
  id?:string;
  children:ReactNode

}

const Button:React.FC<ButtonProps> = (props) => {
   
    return <>
        <button onClick={props.onClick || undefined} className={`${styles.button} ${props.className}`} type={props.type || 'button'} id={props.id || undefined}>{props.children}</button>
    </>
}

export default Button