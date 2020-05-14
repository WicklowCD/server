"""empty message

Revision ID: 7f8366332b04
Revises: 8ccfcb49dbdd
Create Date: 2020-05-14 13:05:28.150423

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '7f8366332b04'
down_revision = '8ccfcb49dbdd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('search_commslog',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uuid', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('search_id', sa.Integer(), nullable=True),
    sa.Column('time', sa.String(length=20), nullable=True),
    sa.Column('call_sign', sa.String(length=10), nullable=True),
    sa.Column('message', sa.Text(), nullable=True),
    sa.Column('action', sa.Text(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['search_id'], ['searches.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('uuid')
    )
    op.create_table('search_searchlog',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uuid', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('search_id', sa.Integer(), nullable=True),
    sa.Column('start_time', sa.String(length=20), nullable=True),
    sa.Column('end_time', sa.String(length=20), nullable=True),
    sa.Column('team', sa.String(length=25), nullable=True),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['search_id'], ['searches.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('uuid')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('search_searchlog')
    op.drop_table('search_commslog')
    # ### end Alembic commands ###
