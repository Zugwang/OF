#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Serveur HTTP simple pour le projet GF experience Simulé
Ce script lance un serveur web local ou en réseau
"""

import http.server
import socketserver
import socket
import sys
import os
import argparse

# Configuration
PORT = 8000
DEFAULT_LOCALHOST_ONLY = True  # Par défaut, localhost uniquement

# Gestionnaire HTTP avec support CORS et types MIME corrects
class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Support CORS pour les requêtes locales
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

        # Cache-Control pour le développement
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')

        super().end_headers()

    def log_message(self, format, *args):
        """Affichage personnalisé des logs"""
        print(f"[{self.log_date_time_string()}] {format % args}")

def get_local_ip():
    """Récupère l'adresse IP locale"""
    try:
        # Création d'une socket temporaire pour obtenir l'IP locale
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except Exception:
        return "127.0.0.1"

def main():
    """Fonction principale pour démarrer le serveur"""

    # Changement de répertoire vers le dossier du script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # Gestion des arguments
    parser = argparse.ArgumentParser(
        description='Serveur HTTP pour GF experience Simulé',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemples d'utilisation:
  python start-server.py              # Mode localhost uniquement (par défaut)
  python start-server.py --network    # Mode réseau (accessible depuis autres appareils)
  python start-server.py --port 8080  # Changer le port
        """
    )
    parser.add_argument('--network', '--lan', action='store_true',
                        help='Activer l\'accès réseau (par défaut: localhost uniquement)')
    parser.add_argument('--port', type=int, default=PORT,
                        help=f'Port du serveur (par défaut: {PORT})')

    args = parser.parse_args()
    port = args.port
    localhost_only = not args.network

    # Choix de l'adresse d'écoute
    if localhost_only:
        host = "127.0.0.1"
        mode = "LOCALHOST UNIQUEMENT"
        mode_icon = "🔒"
    else:
        host = ""  # Écoute sur toutes les interfaces
        mode = "RÉSEAU LOCAL"
        mode_icon = "🌐"

    print("=" * 60)
    print(f"🚀 SERVEUR ONLYSTACHE SIMULÉ - {mode_icon} {mode}")
    print("=" * 60)
    print()

    try:
        # Création du serveur
        with socketserver.TCPServer((host, port), MyHTTPRequestHandler) as httpd:
            local_ip = get_local_ip()

            print("✅ Serveur démarré avec succès !")
            print()

            if localhost_only:
                print("🔒 MODE SÉCURISÉ : Accessible uniquement sur cet ordinateur")
                print()
                print("📡 Accès au site :")
                print(f"   • http://localhost:{port}")
                print(f"   • http://127.0.0.1:{port}")
                print()
                print("📂 Fichier racine: index.html")
                print()
                print("🔗 Pages disponibles :")
                print(f"   • Accueil:       http://localhost:{port}/index.html")
                print(f"   • Statistiques:  http://localhost:{port}/dashboard.html")
                print(f"   • Upload:        http://localhost:{port}/upload.html")
                print(f"   • Messages:      http://localhost:{port}/messages.html")
                print()
                print("=" * 60)
                print("💡 POUR ACTIVER L'ACCÈS RÉSEAU :")
                print("   Relancez avec: python start-server.py --network")
            else:
                print("🌐 MODE RÉSEAU : Accessible depuis d'autres appareils")
                print()
                print("📡 Accès au site :")
                print(f"   • Local:    http://localhost:{port}")
                print(f"   • Réseau:   http://{local_ip}:{port}")
                print()
                print("📂 Fichier racine: index.html")
                print()
                print("🔗 Pages disponibles :")
                print(f"   • Accueil:       http://{local_ip}:{port}/index.html")
                print(f"   • Statistiques:  http://{local_ip}:{port}/dashboard.html")
                print(f"   • Upload:        http://{local_ip}:{port}/upload.html")
                print(f"   • Messages:      http://{local_ip}:{port}/messages.html")
                print()
                print("=" * 60)
                print("💡 INSTRUCTIONS :")
                print("   1. Ouvrez l'URL ci-dessus dans votre navigateur")
                print("   2. Pour accéder depuis un autre appareil sur le réseau,")
                print(f"      utilisez: http://{local_ip}:{port}")

            print("   • Appuyez sur Ctrl+C pour arrêter le serveur")
            print("=" * 60)
            print()
            print("⏳ Serveur en écoute...")
            print()

            # Démarrage du serveur
            httpd.serve_forever()

    except KeyboardInterrupt:
        print()
        print("=" * 60)
        print("🛑 Serveur arrêté par l'utilisateur")
        print("=" * 60)
        sys.exit(0)

    except OSError as e:
        if e.errno == 48 or e.errno == 98:  # Port déjà utilisé
            print()
            print(f"❌ ERREUR : Le port {args.port} est déjà utilisé !")
            print()
            print("💡 Solutions :")
            print("   1. Fermez l'application qui utilise ce port")
            print("   2. Ou utilisez un autre port: python start-server.py --port 8080")
            print()
        else:
            print(f"❌ ERREUR : {e}")
        sys.exit(1)

    except Exception as e:
        print(f"❌ ERREUR INATTENDUE : {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
