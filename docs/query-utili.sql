-- i membri del gruppo
SELECT u.name
FROM group_members gm
JOIN users u ON u.id = gm.user_id
WHERE gm.group_id = 1;

-- quanto ha pagato ogni utente
SELECT u.name, SUM(e.amount_cents) AS pagato
FROM expenses e
JOIN users u ON u.id = e.paid_by
GROUP BY u.name;

-- quanto deve ogni utente in generale
SELECT u.name, SUM(s.share_cents) AS dovuto
FROM expense_shares s
JOIN users u ON u.id = s.user_id
GROUP BY u.name;

-- saldo di ogniuno (pagato meno dovuto, positivo = deve ricevere, negativo = deve dare)
SELECT u.name,
       COALESCE(p.pagato, 0) - COALESCE(d.dovuto, 0) AS saldo_cents
FROM users u
LEFT JOIN (
  SELECT paid_by AS user_id, SUM(amount_cents) AS pagato
  FROM expenses GROUP BY paid_by
) p ON p.user_id = u.id
LEFT JOIN (
  SELECT user_id, SUM(share_cents) AS dovuto
  FROM expense_shares GROUP BY user_id
) d ON d.user_id = u.id
ORDER BY u.id;