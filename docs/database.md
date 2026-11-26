# Schema del database

## Tabella 1 - Utenti
Archivia gli account delle persone registrate nell'applicazione
Colonne: email, name, password_hash

## Tabella 2 - Gruppi di spesa
Rappresenta un contesto condiviso in cui vengono registrate le spese
Colonne: name (nome del gruppo), created_by (ID dell'utente che ha creato il gruppo)

## Tabella 3 - Membri del gruppo
È una tabella di collegamento che indica quali utenti appartengono a quale gruppo
Colonne: group_id, user_id

## Tabella 4 - Spese
Registra ogni spesa e chi ha anticipato il pagamento
Colonne: group_id, paid_by, description, amount_cents (importo totale in centesimi)

## Tabella 5- Quote di ripartizione
Definisce quanto spetta a ciascun partecipante per ogni singola spesa, permettendo divisioni sia in parti uguali sia personalizzate
Colonne: expense_id, user_id, share_cents (quota dovuta da quell'utente per quella spesa, in centesimi)