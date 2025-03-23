import speech_recognition as sr
import json
import sys
import os

# Obtenir le chemin du script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Utiliser des chaînes sans émojis
print("Script Python démarré, PID:", os.getpid())
print("Répertoire de travail actuel:", os.getcwd())
print("Répertoire du script:", script_dir)

def recognize_speech(duration=None, engine="google"):
    """
    Fonction pour convertir la parole en texte
    """
    print("Initialisation de la reconnaissance avec durée={}, moteur={}".format(duration, engine))
    recognizer = sr.Recognizer()
    
    try:
        with sr.Microphone() as source:
            print("Dites quelque chose...")
            recognizer.adjust_for_ambient_noise(source)
            try:
                if duration:
                    print("Enregistrement pendant {} secondes...".format(duration))
                    audio = recognizer.listen(source, timeout=float(duration))
                else:
                    audio = recognizer.listen(source)
                print("Traitement en cours...")
                
                if engine == "google":
                    text = recognizer.recognize_google(audio, language="fr-FR")
                elif engine == "sphinx":
                    text = recognizer.recognize_sphinx(audio, language="fr-FR")
                else:
                    return "Moteur de reconnaissance non supporté."
                
                print("Vous avez dit:", text)
                return text
            except sr.UnknownValueError:
                return "Je n'ai pas compris ce que vous avez dit."
            except sr.RequestError as e:
                return "Erreur de connexion au service de reconnaissance: {}".format(e)
            except Exception as e:
                print("Exception pendant la reconnaissance:", str(e), file=sys.stderr)
                return "Erreur inattendue: {}".format(e)
    except Exception as e:
        print("Exception à l'initialisation du microphone:", str(e), file=sys.stderr)
        return "Erreur d'accès au microphone: {}".format(e)

try:
    # Chemins des fichiers avec des chemins absolus
    params_path = os.path.join(script_dir, 'params.json')
    result_path = os.path.join(script_dir, 'result.json')
    
    print("Tentative de lecture du fichier", params_path)
    # Vérifier si le fichier params existe
    if not os.path.exists(params_path):
        print("Fichier params.json non trouvé!")
        with open(result_path, 'w') as f:
            json.dump({'text': "Erreur: Fichier params.json non trouvé"}, f)
        sys.exit(1)
        
    # Lire les paramètres
    with open(params_path, 'r') as f:
        params_str = f.read()
        print("Contenu du fichier params.json:", params_str)
        params = json.loads(params_str)
    
    duration = params.get('duration', 5)
    engine = params.get('engine', 'google')
    
    print("Paramètres chargés: durée={}, moteur={}".format(duration, engine))
    
    # Exécuter la reconnaissance
    resultat = recognize_speech(duration=duration, engine=engine)
    
    # Écrire le résultat
    with open(result_path, 'w') as f:
        json.dump({'text': resultat}, f)
    
    print("Résultat écrit dans", result_path)
    print(resultat)  # Afficher le résultat final
    
except Exception as e:
    error_msg = "Erreur générale: {}".format(str(e))
    print(error_msg, file=sys.stderr)
    
    # Écrire l'erreur dans le fichier résultat
    result_path = os.path.join(script_dir, 'result.json')
    with open(result_path, 'w') as f:
        json.dump({'text': error_msg}, f)
    
    sys.exit(1)