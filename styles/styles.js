import { Platform, StyleSheet } from 'react-native';


export const dynamicStyles = (theme) => {

  return StyleSheet.create({
    formControl:{
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 8,
    },
    sendButton: {
        backgroundColor: theme.buttonBackground,
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
      backgroundColor: theme.chatMessageColor,
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
      backgroundColor: theme.ownMessageColor,
    },
    registerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: theme.secondaryBackground,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme.color
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
      color: theme.color,
      backgroundColor: theme.formControlBackground,
    },
    submitButton: {
      backgroundColor: theme.buttonBackground,
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
      backgroundColor: theme.primaryBackground,
      alignItems: 'center',
      color: "red"
    },
    authFormText: {
      fontSize: 20,
      color: theme.color
    },
    anchor:{
      color: theme.anchorColor,
      textDecorationLine: 'underline'
    },
    header:{
      paddingTop: Platform.OS === 'ios' ? 50 : 20,
      paddingBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: theme.secondaryBackground,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center'
    },
    headerText: {
      fontSize: 20,
      color: theme.color
    },
    contactItem:{
      height: 60,
      backgroundColor: theme.secondaryBackground,
      display: 'flex',
      justifyContent: "center",
      paddingLeft: 15,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: "rgba(0, 0, 0, 0.2)",
      borderBottomColor: "rgba(0, 0, 0, 0.2)",
    },
    contactText: {
      fontSize: 18,
      color: theme.color
    },
    contactPhn:{
      fontSize: 12,
      color: theme.transparentColor
    },
    closeButtonText: {
      fontSize: 30,
      color: theme.color
    },
    
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: theme.secondaryBackground,
      padding: 20,
      borderRadius: 10,
      width: '80%',
      position: 'relative',
    },
    modalText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.color
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
    },
    contactScrollView: {
      backgroundColor: theme.primaryBackground
    }
  })
}
