import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    formControl:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
    },
    sendButton: {
        backgroundColor: '#3498db',
        borderRadius: 5,
        padding: 15,
    },
    sendButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        marginBottom: '10px',
        marginTop: 30
    },
      chatMessages: {
        flex: 1,
        overflowY: 'auto',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column-reverse',
      },
      messageContainer: {
        display: 'flex',
        marginBottom: '10px',
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      chatMessage: {
        backgroundColor: '#3498db',
        color: '#fff',
        borderRadius: '10px',
        padding: '10px',
        width: '10em',
        maxWidth: '70%',
      },
      username: {
        fontSize: '16px',
        color: '#777',
      },
      messageContainerRight: {
        alignItems: 'flex-end',
      },
      chatMessageRight: {
        backgroundColor: '#2ecc71',
      },
      registerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      form: {
        width: '100%',
      },
      formGroup: {
        marginBottom: 10,
      },
      formControl: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
      },
      submitButton: {
        backgroundColor: '#3498db',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginBottom: 20
      },
      headerButton: {
        backgroundColor: '#3498db',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
      },
      submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      authFormText: {
        fontSize: 20
      },
      anchor:{
        color: "blue",
        textDecorationLine: 'underline'
      },
    header:{
        paddingTop: 50,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20,
    },
    contactItem:{
        height: 60,
        backgroundColor: "white",
        display: 'flex',
        justifyContent: "center",
        paddingLeft: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: "rgba(0, 0, 0, 0.2)",
        borderBottomColor: "rgba(0, 0, 0, 0.2)",
    },
    contactText: {
        fontSize: 18
    },
    contactPhn:{
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.6)'
    },
      closeButtonText: {
        fontSize: 30,
      },
      
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        position: 'relative', // Added position relative for absolute positioning of close button
      },
      modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
      },
      modalHeader:{
        display: 'flex',
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: 'center'
      }
})  