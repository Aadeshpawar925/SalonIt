import React from "react";


export default function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.text}>Copyright &copy; {new Date().getFullYear()}</div>
                <div style={styles.text}>Powered By Salon It</div>
                <div style={styles.socialLinks}>
                    <a href="https://facebook.com" style={styles.link} target="_blank" rel="noopener noreferrer">Facebook</a> | 
                    <a href="https://instagram.com" style={styles.link} target="_blank" rel="noopener noreferrer">Instagram</a> | 
                    <a href="https://twitter.com" style={styles.link} target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
            </div>
        </footer>
    );
}

const styles = {
    footer: {
        
      
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px 0",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
    },
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
    },
    text: {
        margin: "10px 0",
        fontSize: "14px",
    },
    socialLinks: {
        marginTop: "10px",
    },
    link: {
        color: "#fff",
        textDecoration: "none",
        margin: "0 10px",
    }
};
